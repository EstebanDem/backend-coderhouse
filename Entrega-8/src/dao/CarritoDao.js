import { knex } from '../db.js';

export class CarritoDao {

    TABLE_NAME = 'carrito';
    ID_COLUMN = 'id';
    
    async save(object) {
        try {
            const newCarritoId = await knex.insert(object).from(this.TABLE_NAME);        
            console.log(`✔️ Carrito agregado con ID: ${newCarritoId}.`);
            return newCarritoId;
        } catch (error) {
            console.log(error);
        } finally {
            knex.destroy();
        }
    }
    
    async deleteById(id) {
        try {
            await knex.del().from(this.TABLE_NAME).where(this.ID_COLUMN, id);
            console.log('🪦 Carrito borrado.');
            return true;
        } catch (error) {
            console.log(error);
        } finally {
            knex.destroy();
        }
    }
}
