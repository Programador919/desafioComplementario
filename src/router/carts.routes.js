import { Router } from "express";
import {cartsModel} from "../models/carts.model.js";

const router = Router()

//get
router.get("/", async(req, res) => {
    try {
        let carts = await cartsModel.find()
        res.send({result: "success", payload: carts})
    } catch (error) {
        console.log(error)
    }
})

//post
router.post("/", async(req, res) => {
    let {description, quantity, total } = req.body

    if(!description || !quantity || !total) {
        req.send({status: "error", error: "Faltan datos"})
    } 
    let result = await cartsModel.create({description, quantity, total})
    res.send({result: "success", payload: result})
})

//put
router.put("/:id_cart", async(req, res) => {
    let {id_cart} = req.params

    let cartsToReplace = req.body
    if(!cartsToReplace.description || !cartsToReplace.quantity || !cartsToReplace.total) {
        res.send({status: "error", error: "Faltan datos"})
    }
        let result = await cartsModel.updateOne({_id: id_cart}, cartsToReplace)
        res.send({result: "success", payload: result})
})

//delete
router.delete("/:id_cart", async(req, res) => {
    let {id_cart} = req.params
    let result = await cartsModel.deleteOne({_id: id_cart})
    res.send ({result: "success", payload: result})
})

export default router 
