import {buildSchema} from "graphql";
import {ProductoType} from "./types/Producto.type.js";
import {CarritoType} from "./types/Carrito.type.js";
import {GetAllCarritosQuery} from "./queries/GetAllCarritos.query.js";
import {GetAllProductosQuery} from "./queries/GetAllProductos.query.js";
import {CreateCarritoQuery} from "./mutations/CreateCarrito.query.js";
import {DeleteCarritoByIdQuery} from "./mutations/DeleteCarritoById.query.js";
import {GetAllProductsFromCartByIdQuery} from "./queries/GetAllProductsFromCartById.query.js";
import {SaveProductToCartQuery} from "./mutations/SaveProductToCart.query.js";
import {DeleteProductFromCartQuery} from "./mutations/DeleteProductFromCart.query.js";
import {GetProductByIdQuery} from "./queries/GetProductById.query.js";
import {ProductoNewInput} from "./inputs/ProductoNew.input.js";
import {CreateProductoQuery} from "./mutations/CreateProducto.query.js";
import {ProductoUpdateInput} from "./inputs/ProductoUpdate.input.js";
import {UpdateProductByIdQuery} from "./mutations/UpdateProductById.query.js";
import {DeleteProductByIdQuery} from "./mutations/deleteProductById.query.js";

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
    ${DeleteCarritoByIdQuery}
    ${CreateCarritoQuery}
    ${SaveProductToCartQuery}
    ${DeleteProductFromCartQuery}
    ${CreateProductoQuery}
    ${UpdateProductByIdQuery}
    ${DeleteProductByIdQuery}
  }
`);