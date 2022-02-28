const Contenedor = require("./Contenedor");
const express = require('express');
const app = express();
/*  Recordar que sea 8080 para glitch.me  */
const PORT = 8080;
const contenedor = new Contenedor("productos.json");

app.get('/', (req, res) => {
    res.send('Hi Express Server!')
});

app.get('/productos', async (req, res) => {
    const allProducts = await contenedor.getAll();
    res.json(allProducts);
});

app.get('/productoRandom', async (req, res) => {
    const allProducts = await contenedor.getAll();
    const maxId = allProducts.length;
    
    const randomNumber = generateRandomNumber(1, maxId);
    const randomProduct = await contenedor.getById(randomNumber);

    res.json(randomProduct);

})

app.get('/albums', (req, res) => {
    res.send('Hi, you are at Albums')
});

app.get('/object', (req, res) => {
    res.json({title: 'Are you experienced?', artist: 'The Jimi Hendrix Experience'})
});

const generateRandomNumber = (min, max) => {
    return Math.floor((Math.random() * (max+1 -min)) +min);
}

const server = app.listen(PORT, () => {
    console.log(`>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (error) => console.log(error));