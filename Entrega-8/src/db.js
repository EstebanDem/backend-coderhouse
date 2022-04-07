import { config } from './config.js';
import _knex from 'knex';
//console.log(config);
export const knex = _knex(config)