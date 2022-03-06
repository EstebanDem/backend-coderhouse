const express = require('express');
const Contenedor = require('./src/contenedor')
const contenedor = new Contenedor("productos.json");
const app = express();
app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = express.Router();


app.use('/api/productos', router);

// GET /api/productos
router.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.status(200).json(products)
})

// GET /api/productos/:id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await contenedor.getById(id);

    product
        ? res.status(200).json(product)
        : res.status(404).json({error: "Producto no encontrado"});
    
})

// POST /api/productos
router.post('/', async (req,res) => {
    const {body} = req;
    const newProductId = await contenedor.save(body);
    res.status(200).send(`Producto agregado con el ID: ${newProductId}`)
})

// PUT /api/productos/:id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await contenedor.updateById(id,body);
    wasUpdated
        ? res.status(200).send(`El producto de ID: ${id} fue actualizado`)
        : res.status(404).send(`El producto no fue actualizado porque no se encontró el ID: ${id}`);
})

// DELETE /api/productos/:id
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await contenedor.deleteById(id);
    wasDeleted 
        ? res.status(200).send(`El producto de ID: ${id} fue borrado`)
        : res.status(404).send(`El producto no fue borrado porque no se encontró el ID: ${id}`);
})


const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));