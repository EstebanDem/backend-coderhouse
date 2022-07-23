import {ProductoService} from "../../services/producto.service.js";

export const DeleteProductByIdMutation = `
    deleteProductById(id:ID!): Producto
`

export async function deleteProductById({id}) {
    return ProductoService.getInstance().deleteById(id);
}