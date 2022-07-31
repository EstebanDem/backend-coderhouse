import { ObjectId } from "../deps.ts";

export interface Product {
    _id: ObjectId,
    date: Date
    title: String,
    price: Number,
    description: String,
    code: String,
    image: String,
    stock: Number
}