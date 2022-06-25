import "../config/db.js";
import { CarritosModel } from '../modules/carritos.modules.js';
import logger from "../loggers/Log4jsLogger.js";
export class CarritoDao {

    ID_FIELD = "_id";
    
    async createCart() {
        try {
            return await CarritosModel.create({});
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
    
    async deleteCartById(id) {
        try {
            return await CarritosModel.findByIdAndDelete({[this.ID_FIELD]: id})
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
    // 6254bf5bdb4015399b45c35f
    async saveProductToCart(id, obj) {
        try {
            const cart = await CarritosModel.findById(id)
            cart.products.push(obj.productId);
            cart.save();
            return true;
        } catch (error) {
            logger.error(error);
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
            logger.error(error);
            return false;
        }
    }
    
    async getAllProductsFromCart(id) {
        try {
            return await CarritosModel.findById(id).populate('products').select({products: 1, _id:0});
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
}