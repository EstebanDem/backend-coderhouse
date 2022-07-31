import { Context, helpers } from "../deps.ts";
import type { Product } from "../types/product.type.ts";
import { products } from "../configs/db.config.ts";
import { Bson } from "../deps.ts";


export async function getProducts(ctx: Context) {
    const allProducts = await products.find({}).toArray();
    if (allProducts) {
        ctx.response.body = allProducts;
        ctx.response.status = 200;
    }
}

export async function getProduct(ctx: Context) {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const product = await products.findOne({ _id: new Bson.ObjectId(id) });
    if (product) {
        ctx.response.status = 200;
        ctx.response.body = product;
    }
    ctx.response.status = 400;

}

export async function createProduct(ctx: Context) {
    const product: Product = await ctx.request.body().value;
    product._id = new Bson.ObjectId();
    product.date = new Date();
    await products.insertOne(product);
    ctx.response.status = 201;
    ctx.response.body = product;
}

export async function updateProduct(ctx: Context) {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const product: Product = await ctx.request.body().value;
    try {
        const updatedProduct = await products.updateOne({ _id: new Bson.ObjectId(id) }, { $set: { ...product } }, { upsert: true });
        ctx.response.status = 200;
        ctx.response.body = updatedProduct;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(ctx: Context) {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    try {
        await products.deleteOne({ _id: id })
        ctx.response.status = 202
    } catch (error) {
        console.log(error);
    }
}
