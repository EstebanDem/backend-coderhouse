import express from 'express';
import dotenv from 'dotenv';
import { ProductoDao } from './dao/ProductoDao.js';
import { CarritoDao } from './dao/CarritoDao.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


/* const authMiddleware = app.use((req, res, next) => {
    req.header('authorization') == process.env.TOKEN 
        ? next()
        : res.status(401).json({"error": "unauthorized"})
}) */

const routerProducts = express.Router();
const routerCart = express.Router();

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

const productoDao = new ProductoDao();
const carritoDao = new CarritoDao();

/* ------------------------ Product Endpoints ------------------------ */

// GET api/productos
routerProducts.get('/', async (req, res) => {
    const products = await productoDao.getAll();
    res.status(200).json(products);
})

// GET api/productos/:id
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productoDao.getProductById(id);
    
    product
        ? res.status(200).json(product)
        : res.status(400).json({"error": "product not found"})
})

// POST api/productos
routerProducts.post('/', async (req,res) => {
    const {body} = req;
    
    body.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    const newProductId = await productoDao.save(body);
    
    newProductId
        ? res.status(200).json({"success" : "product added with ID: "+newProductId})
        : res.status(400).json({"error": "Some key might be wrong. Please verify the body content"})
})

// PUT api/productos/:id
routerProducts.put('/:id',  async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await productoDao.updateProductById(body, id);
    
    wasUpdated
        ? res.status(200).json({"success" : "product updated"})
        : res.status(404).json({"error": "product not found or invalid body content."})
})

// DELETE /api/productos/:id
routerProducts.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await productoDao.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "product successfully removed"})
        : res.status(404).json({"error": "product not found"})
})

/* ------------------------ Cart Endpoints ------------------------ */

// POST /api/carrito
routerCart.post('/', async(req, res) => {
    const newCartId = await carritoDao.save();
    
    newCartId
        ? res.status(200).json({"success" : "cart added with ID: "+newCartId})
        : res.status(400).json({"error": "There was a problem, please try again later"});
})

const PORT = 1234;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));