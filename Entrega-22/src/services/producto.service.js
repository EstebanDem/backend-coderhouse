import { ProductosModel } from "../models/productos.model.js";
import {BaseDao} from "./BaseDao.js";

export class ProductoService extends BaseDao{

    ID_FIELD = "_id";

    static getInstance() {
        return new ProductoService();
    }

    constructor() {
        if(typeof ProductoService.instance === 'object') {
            return ProductoService.instance;
        }
        super();
        ProductoService.instance = this;
        return this;
    }
    
    static async exists(id) {
        try {
            return await ProductosModel.findById(id);
        } catch (error) {
            this.logger.error(error);
        }
    }

    async getAll() {
        try {
            return await ProductosModel.find();
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async getProductById(id) {
        try {
            const product = await ProductosModel.findById(id);
            return product;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async create(object) {
        try {
            return await ProductosModel.create(object)
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async updateProductById(id, object) {
        try {
            await ProductosModel.findByIdAndUpdate(
                {
                    [this.ID_FIELD] : id
                },
                object, 
                {
                    runValidators: true
                })
            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async deleteById(id) {
        try {
            return await ProductosModel.findByIdAndDelete({[this.ID_FIELD]: id})
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
}