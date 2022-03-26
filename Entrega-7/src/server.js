const express = require('express');
const app = express();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json", ["timestamp", "title", "price", "description", "code", "image", "stock"]);
const carrito = new Contenedor("carrito.json", ["timestamp", "products"])

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const routerProducts = express.Router();
const routerCart = express.Router();

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

/* ------------------------ Product Endpoints ------------------------ */

// GET api/productos
routerProducts.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.status(200).json(products);
})

// GET api/productos/:id
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await contenedor.getById(id);
    
    product
        ? res.status(200).json(product)
        : res.status(400).json({"error": "product not found"})
})

// POST api/productos
routerProducts.post('/', async (req,res) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    
    const newProductId = await contenedor.save(body);
    
    newProductId
        ? res.status(200).json({"success" : "product added with ID: "+newProductId})
        : res.status(400).json({"error": "invalid key. Please verify the body content"})
})

// PUT api/productos/:id
routerProducts.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await contenedor.updateById(id,body);
    
    wasUpdated
        ? res.status(200).json({"success" : "product updated"})
        : res.status(404).json({"error": "product not found"})
})


// DELETE /api/productos/:id
routerProducts.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await contenedor.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "product successfully removed"})
        : res.status(404).json({"error": "product not found"})
})

/* ------------------------ Cart Endpoints ------------------------ */

// POST /api/carrito

routerCart.post('/', async(req, res) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    
    const newCartId = await carrito.save(body);
    
    newCartId
        ? res.status(200).json({"success" : "cart added with ID: "+newCartId})
        : res.status(400).json({"error": "invalid key. Please verify the body content"})
    
})

// DELETE /api/carrito/id
routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "cart successfully removed"})
        : res.status(404).json({"error": "cart not found"})
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req,res) => {
    //body va el id del producto , parametro es el del carrito.
    const {id} = req.params;
    const { body } = req;
    
    const product = await contenedor.getById(body['id']);
    
    await carrito.addToArrayById(id, {"products": product})
    
   //falta resolver  
})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async(req, res) => {
    const { id } = req.params;
    const cart = await carrito.getById(id)
    
    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json({"error": "cart not found"})
    
    
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    await carrito.removeFromArrayById(id, id_prod, 'products')
})

const PORT = 8020;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));