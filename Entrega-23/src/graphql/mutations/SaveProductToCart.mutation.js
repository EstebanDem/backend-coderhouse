import {CarritoService} from "../../services/carrito.service.js";

export const SaveProductToCartMutation = `
    saveProductToCart(id:ID!, idProd:ID!): Boolean
`

export async function saveProductToCart({id, idProd}) {
    return CarritoService.getInstance().saveProductToCart(id, idProd);
}
