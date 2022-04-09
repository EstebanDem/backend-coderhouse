import { createProductoTable, createCarritoTable, createProductoCarritoTable } from './CreateTables.js';
import { populateCarts, populateProductoCarrito, populateProducts } from './Populate.js';

async function rebuild() {
    await createProductoTable();
    await createCarritoTable();
    await createProductoCarritoTable();
    
    await populateProducts();
    await populateCarts();
    
    await populateProductoCarrito();
    
}

rebuild();