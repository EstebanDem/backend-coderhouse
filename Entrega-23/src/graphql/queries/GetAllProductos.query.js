import {ProductoService} from "../../services/producto.service.js";

export const GetAllProductosQuery = `
    getAllProductos: [Producto]
`

export async function getAllProductos() {
    return ProductoService.getInstance().getAll();
}