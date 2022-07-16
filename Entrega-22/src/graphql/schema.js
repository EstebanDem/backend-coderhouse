import {buildSchema} from "graphql";
import {ProductoType} from "./types/Producto.type.js";
import {CarritoType} from "./types/Carrito.type.js";
import {GetAllCarritosQuery} from "./queries/GetAllCarritos.query.js";
import {GetAllProductosQuery} from "./queries/GetAllProductos.query.js";
import {CreateCarritoQuery} from "./queries/CreateCarrito.query.js";
import {DeleteCarritoByIdQuery} from "./queries/DeleteCarritoById.query.js";
import {GetAllProductsFromCartByIdQuery} from "./queries/GetAllProductsFromCartById.query.js";
import {SaveProductToCartQuery} from "./queries/SaveProductToCart.query.js";
import {DeleteProductFromCartQuery} from "./queries/DeleteProductFromCart.query.js";
import {GetProductByIdQuery} from "./queries/GetProductById.query.js";
import {ProductoNewInput} from "./inputs/ProductoNew.input.js";
import {CreateProductoQuery} from "./queries/CreateProducto.query.js";
import {ProductoUpdateInput} from "./inputs/ProductoUpdate.input.js";
import {UpdateProductByIdQuery} from "./queries/UpdateProductById.query.js";
import {DeleteProductByIdQuery} from "./queries/deleteProductById.query.js";

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