import {ProductoService} from "../../services/producto.service.js";

export const UpdateProductByIdMutation = `
    updateProductById(id:ID!, data: ProductoUpdateInput): Boolean
`

export async function updateProductById({id, data}) {
    return ProductoService.getInstance().updateProductById(id, data);
}