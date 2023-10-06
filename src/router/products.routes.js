import { Router } from "express";
import {productsModel} from "../models/products.model.js";

const router = Router()

//get
router.get("/", async(req, res) => {
    try {
        let products = await productsModel.find()
        res.send({result: "success", payload: products})
    } catch (error) {
        console.log(error)
    }
})

//post
router.post("/", async(req, res) => {
    let {name, description, image, price, stock } = req.body

    if(!name || !description || !image || !price || !stock) {
        req.send({status: "error", error: "Faltan datos"})
    } 
    let result = await productsModel.create({name, description, image, price, stock})
    res.send({result: "success", payload: result})
})

//put
router.put("/:id_prod", async(req, res) => {
    let {id_prod} = req.params

    let productsToReplace = req.body
    if(!productsToReplace.name || !productsToReplace.description || !productsToReplace.image || !productsToReplace.price || !productsToReplace.stock) {
        res.send({status: "error", error: "Faltan datos"})
    }
        let result = await productsModel.updateOne({_id: id_prod}, productsToReplace)
        res.send({result: "success", payload: result})
})

//delete
router.delete("/:id_prod", async(req, res) => {
    let {id_prod} = req.params
    let result = await productsModel.deleteOne({_id: id_prod})
    res.send ({result: "success", payload: result})
})

export default router 
