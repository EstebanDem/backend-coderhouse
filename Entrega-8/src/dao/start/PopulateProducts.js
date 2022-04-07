import { knex } from '../../db.js';

const productos = [

    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        title: 'Some Product 1',
        price: 100,
        description: 'Some dummy description 1',
        code: 'XY-1',
        image: 'someDummyUrl1.com',
        stock: 150
    },
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        title: 'Some Product 2',
        price: 200,
        description: 'Some dummy description 2',
        code: 'XY-2',
        image: 'someDummyUrl2.com',
        stock: 250
    },
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        title: 'Some Product 3',
        price: 300,
        description: 'Some dummy description 3',
        code: 'XY-3',
        image: 'someDummyUrl3.com',
        stock: 350
    },
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        title: 'Some Product 4',
        price: 400,
        description: 'Some dummy description 4',
        code: 'XY-4',
        image: 'someDummyUrl4.com',
        stock: 450
    },
]

export async function populateProducts() {
    try {
        await knex.insert(productos).from('productos');
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
}