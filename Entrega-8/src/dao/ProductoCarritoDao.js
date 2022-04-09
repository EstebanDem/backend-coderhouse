import { knex } from '../db.js';
export class ProductoCarritoDao {

    TABLE_NAME = 'productoCarrito';
    ID_COLUMN = 'id';
    CARRITO_ID_COLUMN = 'carritoId';
    PRODUCTO_ID_COLUMN = 'productoId';
    
    async saveProductToCart(cartId, productId) {
        
        const obj = {
            [this.CARRITO_ID_COLUMN]  : cartId,
            [this.PRODUCTO_ID_COLUMN] : productId
        }
        
        try {
            const newProductCartId = await knex.insert(obj).from(this.TABLE_NAME);
            console.log(`✔️ Producto agregado correctamente al carrito, la relación tiene un ID: ${newProductCartId}.`);
            return newProductCartId;
        } catch(error) {
            console.log(error);
        }
    }
    
    async deleteProductFromCart(cartId, productId) {
        try {
            await knex.del().from(this.TABLE_NAME)
                .where(this.CARRITO_ID_COLUMN, cartId)
                .where(this.PRODUCTO_ID_COLUMN, productId);
            return true;
        } catch(error) {
            console.log(error);
        }
    }
    
    async getAllProductsFromCart(cartId) {
        try {
            const products = await knex
                .select('producto.title')
                .from(this.TABLE_NAME)
                .join('producto', 'producto.id', 'productoCarrito.productoId')
                .where(this.CARRITO_ID_COLUMN, cartId);
            return products;
        } catch(error) {
            console.log(error);
        }
    }
}