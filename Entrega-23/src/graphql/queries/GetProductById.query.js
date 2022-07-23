import {ProductoService} from "../../services/producto.service.js";

export const GetProductByIdQuery = `
    getProductById(id:ID!): Producto
`

export async function getProductById({id}) {
    return ProductoService.getInstance().getProductById(id);
}