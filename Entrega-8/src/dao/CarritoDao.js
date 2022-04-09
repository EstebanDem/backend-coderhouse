import { knex } from '../db.js';

export class CarritoDao {

    TABLE_NAME = 'carrito';
    ID_COLUMN = 'id';
    
    async save() {
        try {
            const timeNow = {"timestamp": new Date().toISOString().slice(0, 19).replace('T', ' ')};
            const newCarritoId = await knex.insert(timeNow).from(this.TABLE_NAME);        
            console.log(`✔️ Carrito agregado con ID: ${newCarritoId}.`);
            return newCarritoId;
        } catch (error) {
            console.log(error);
        } 
    }
    
    async deleteById(id) {
        try {
            await knex.del().from(this.TABLE_NAME).where(this.ID_COLUMN, id);
            console.log('🪦 Carrito borrado.');
            return true;
        } catch (error) {
            console.log(error);
        }
    }
}
