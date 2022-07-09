import { CarritosModel } from '../models/carritos.model.js';
import {BaseDao} from "./BaseDao.js";

export class CarritoService extends BaseDao {

    ID_FIELD = "_id";
    
    async create() {
        try {
            return await CarritosModel.create({});
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }

    async getAll() {
        try {
            return await CarritosModel.find();
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async deleteById(id) {
        try {
            return await CarritosModel.findByIdAndDelete({[this.ID_FIELD]: id})
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }

    async saveProductToCart(id, obj) {
        try {
            const cart = await CarritosModel.findById(id)
            cart.products.push(obj.productId);
            cart.save();
            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async deleteProductFromCart(id, productId) {
        try {
            const cart = await CarritosModel.findById(id);
            cart.products.remove(productId);
            cart.save();
            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async getAllProductsFromCart(id) {
        try {
            return await CarritosModel.findById(id).populate('products').select({products: 1, _id:0});
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
}