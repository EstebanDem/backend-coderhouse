import {ProductoDao} from "../dao/producto.dao.js";

const productoDao = new ProductoDao();

export async function getAll(req, res) {
    const products = await productoDao.getAll();
    products
        ? res.status(200).json(products)
        : res.status(400).json({"error": "there was a problem when trying to get the products"})
}

export async function getById(req, res) {
    const {id} = req.params;
    const product = await productoDao.getProductById(id);

    product
        ? res.status(200).json(product)
        : res.status(400).json({"error": "product not found"})
}

export async function create(req, res) {
    const {body} = req;
    const newProduct = await productoDao.createProduct(body);

    newProduct
        ? res.status(200).json({"success": "Product added with ID " + newProduct._id})
        : res.status(400).json({"error": "there was an error, please verify the body content match the schema"})
}

export async function update(req, res) {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await productoDao.updateProductById(id, body);

    wasUpdated
        ? res.status(200).json({"success": "product updated"})
        : res.status(404).json({"error": "product not found or invalid body content."})
}

export async function remove(req, res) {
    const {id} = req.params;
    const wasDeleted = await productoDao.deleteProductById(id)

    wasDeleted
        ? res.status(200).json({"success": "product successfully removed"})
        : res.status(404).json({"error": "product not found"})
}
