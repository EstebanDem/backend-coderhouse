import {CarritoService} from "../../services/carrito.service.js";

export const GetAllCarritosQuery = `
    getAllCarritos: [Carrito]
`

export async function getAllCarritos() {
    return CarritoService.getInstance().getAll();
}
