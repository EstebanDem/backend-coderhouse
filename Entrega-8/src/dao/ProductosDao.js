import { knex } from '../db.js';

export class ProductosDao {

    TABLE_NAME = 'productos';
    ID_COLUMN = 'id';
    
    async save(object) {
        try {
            const newProductId = await knex.insert(object).from(this.TABLE_NAME);        
            console.log(`✔️ Producto agregado con ID: ${newProductId}.`);
        } catch (error) {
            console.log(error);
        } finally {
            knex.destroy();
        }
    }
    
    async deleteById(id) {
        try {
            await knex.del().from(this.TABLE_NAME).where(this.ID_COLUMN, id);
            console.log('🪦 Producto borrado.');
        } catch (error) {
            console.log(error);
        } finally {
            knex.destroy();
        }
    }
    
    async getAll() {
        try {
            return await knex.select().from(this.TABLE_NAME);
        } catch (error) {
            console.log(error);
        } finally {
            knex.destroy();
        }
    }
    
    async getProductById(id) {
        try {
            const product = await knex.select().from(this.TABLE_NAME).where(this.ID_COLUMN, id);
            console.log(product);
            return product;
        } catch (error) {
            console.log(error);
        } finally {
            knex.destroy();
        }
    }
    
    async updateProductById(object, id) {
        try {
            await knex.from(this.TABLE_NAME).update(object).where(this.ID_COLUMN, id)
        } catch (error) {
            console.log(error);
        } finally {
            knex.destroy();
        }
    }
}
