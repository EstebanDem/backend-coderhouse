import {CarritoService} from "../../services/carrito.service.js";

export const DeleteProductFromCartMutation = `
    deleteProductFromCart(id:ID!, idProd:ID!): Boolean
`

export async function deleteProductFromCart({id, idProd}) {
    return CarritoService.getInstance().deleteProductFromCart(id, idProd);
}