import {CarritoService} from "../../services/carrito.service.js";

export const DeleteCarritoByIdMutation = `
    deleteCarritoById(id:ID!): Carrito
`

export async function deleteCarritoById({id}) {
    return CarritoService.getInstance().deleteById(id);
}