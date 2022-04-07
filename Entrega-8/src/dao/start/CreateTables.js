import { knex } from '../../db.js';

export async function createTables() {
    try {
        const isCreated = await knex.schema.hasTable('productos');
        if(isCreated) {
            console.log('🔴 La tabla ya existe creada en la DB')
        } else {
            await knex.schema.createTable('productos', (table) => {
                table.increments('id').primary().notNullable(),
                table.timestamp('timestamp').notNullable(),
                table.string('title', 100).notNullable(),
                table.float('price').notNullable(),
                table.string('description', 300),
                table.string('code').unique(),
                table.string('image', 200),
                table.integer('stock').notNullable()
            })
            console.log('🟢 La tabla productos ha sido creada')
        }
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
}
