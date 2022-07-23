import {CarritoService} from "../../services/carrito.service.js";

export const GetAllProductsFromCartByIdQuery = `
    getAllProductsFromCartById(id:ID!): [Producto]
`

export async function getAllProductsFromCartById({id}) {
    return CarritoService.getInstance().getAllProductsFromCart(id);
}