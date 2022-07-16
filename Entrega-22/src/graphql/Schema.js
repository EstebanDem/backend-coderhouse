import {buildSchema} from "graphql";
import {ProductoType} from "./types/Producto.type.js";
import {CarritoType} from "./types/Carrito.type.js";
import {GetAllCarritosQuery} from "./queries/GetAllCarritos.query.js";
import {GetAllProductosQuery} from "./queries/GetAllProductos.query.js";
import {CreateCarritoMutation} from "./mutations/CreateCarrito.mutation.js";
import {DeleteCarritoByIdMutation} from "./mutations/DeleteCarritoById.mutation.js";
import {GetAllProductsFromCartByIdQuery} from "./queries/GetAllProductsFromCartById.query.js";
import {SaveProductToCartMutation} from "./mutations/SaveProductToCart.mutation.js";
import {DeleteProductFromCartMutation} from "./mutations/DeleteProductFromCart.mutation.js";
import {GetProductByIdQuery} from "./queries/GetProductById.query.js";
import {ProductoNewInput} from "./inputs/ProductoNew.input.js";
import {CreateProductoMutation} from "./mutations/CreateProducto.mutation.js";
import {ProductoUpdateInput} from "./inputs/ProductoUpdate.input.js";
import {UpdateProductByIdMutation} from "./mutations/UpdateProductById.mutation.js";
import {DeleteProductByIdMutation} from "./mutations/DeleteProductById.mutation.js";

export const schema = buildSchema(`
  ${ProductoType}
  ${ProductoNewInput}
  ${CarritoType}
  ${ProductoUpdateInput}
  
  type Query {
    ${GetAllCarritosQuery}
    ${GetProductByIdQuery}
    ${GetAllProductosQuery}
    ${GetAllProductsFromCartByIdQuery}  
  }
  
  type Mutation {
    ${DeleteCarritoByIdMutation}
    ${CreateCarritoMutation}
    ${SaveProductToCartMutation}
    ${DeleteProductFromCartMutation}
    ${CreateProductoMutation}
    ${UpdateProductByIdMutation}
    ${DeleteProductByIdMutation}
  }
`);