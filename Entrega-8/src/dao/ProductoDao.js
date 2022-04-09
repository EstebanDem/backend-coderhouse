import { knex } from '../db.js';

export class ProductoDao {

    TABLE_NAME = 'producto';
    ID_COLUMN = 'id';
    
    async save(object) {
        try {
            const newProductId = await knex.insert(object).from(this.TABLE_NAME);        
            console.log(`✔️ Producto agregado con ID: ${newProductId}.`);
            return newProductId;
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
            return true;
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
            return await knex.select().from(this.TABLE_NAME).where(this.ID_COLUMN, id);
        } catch (error) {
            console.log('Product not found');
        } finally {
            knex.destroy();
        }
    }
    
    async updateProductById(object, id) {
        try {
            await knex.from(this.TABLE_NAME).update(object).where(this.ID_COLUMN, id)
            return true;
        } catch (error) {
            console.log(error);
        } finally {
            knex.destroy();
        }
    }
}
