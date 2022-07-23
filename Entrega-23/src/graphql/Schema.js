import {buildSchema} from "graphql";
import {ProductoType} from "./types/Producto.type.js";
import {CarritoType} from "./types/Carrito.type.js";
import {ProductoNewInput} from "./inputs/ProductoNew.input.js";
import {ProductoUpdateInput} from "./inputs/ProductoUpdate.input.js";
/** Queries and mutations **/
import {GetAllCarritosQuery, getAllCarritos} from "./queries/GetAllCarritos.query.js";
import {GetAllProductosQuery, getAllProductos} from "./queries/GetAllProductos.query.js";
import {CreateCarritoMutation, createCarrito} from "./mutations/CreateCarrito.mutation.js";
import {DeleteCarritoByIdMutation, deleteCarritoById} from "./mutations/DeleteCarritoById.mutation.js";
import {GetAllProductsFromCartByIdQuery, getAllProductsFromCartById} from "./queries/GetAllProductsFromCartById.query.js";
import {SaveProductToCartMutation, saveProductToCart} from "./mutations/SaveProductToCart.mutation.js";
import {DeleteProductFromCartMutation, deleteProductFromCart} from "./mutations/DeleteProductFromCart.mutation.js";
import {GetProductByIdQuery, getProductById} from "./queries/GetProductById.query.js";
import {CreateProductoMutation, createProduct} from "./mutations/CreateProducto.mutation.js";
import {UpdateProductByIdMutation, updateProductById} from "./mutations/UpdateProductById.mutation.js";
import {DeleteProductByIdMutation, deleteProductById} from "./mutations/DeleteProductById.mutation.js";

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

export const queriesAndMutations = {
    getAllCarritos,
    getAllProductos,
    createCarrito,
    deleteCarritoById,
    getAllProductsFromCartById,
    saveProductToCart,
    deleteProductFromCart,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}
