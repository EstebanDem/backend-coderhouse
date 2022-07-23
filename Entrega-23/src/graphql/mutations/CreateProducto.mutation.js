import {ProductoService} from "../../services/producto.service.js";

export const CreateProductoMutation = `
    createProduct(data: ProductoNewInput): Producto
`

export async function createProduct({data}) {
    return ProductoService.getInstance().create(data);
}