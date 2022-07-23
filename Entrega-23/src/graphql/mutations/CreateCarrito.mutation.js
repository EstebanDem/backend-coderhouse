import {CarritoService} from "../../services/carrito.service.js";

export const CreateCarritoMutation = `
    createCarrito: Carrito
`

export async function createCarrito() {
    return CarritoService.getInstance().create();
}