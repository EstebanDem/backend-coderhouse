const express = require('express');
const app = express();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './src/views');
app.set('view engine', 'pug');

// GET /productos | Lista de productos
app.get('/productos', async (req, res) => {
    const products = await contenedor.getAll();
    res.render('list',{products:products
    })
})

app.get('/', (req,res) => {
    res.render('form', {})
})

app.post('/productos', async(req,res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect('/');
})

const PORT = 6065;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));
