import mongoose from 'mongoose';

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    name:{type:"String", max: 50, required: true},
    description:{type:"String", max: 100, required: true},
    image:{type:"String", max: 1000, required: true},
    price:{type:"Number", required: true},
    stock:{type:"Number", required: true}
})

export const productsModel = mongoose.model(productsCollection, productsSchema)