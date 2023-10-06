import { Router } from "express";
import {messagesModel} from "../models/messages.model.js";

const router = Router()

//get
router.get("/", async(req, res) => {
    try {
        let messages = await messagesModel.find()
        res.send({result: "success", payload: messages})
    } catch (error) {
        console.log(error)
    }
})

//post
router.post("/", async(req, res) => {
    let {user, message } = req.body

    if(!user || !message ) {
        req.send({status: "error", error: "Faltan datos"})
    } 
    let result = await messagesModel.create({user, message})
    res.send({result: "success", payload: result})
})

//put
router.put("/:id_msg", async(req, res) => {
    let {id_msg} = req.params

    let messagesToReplace = req.body
    if(!messagesToReplace.user || !messagesToReplace.message) {
        res.send({status: "error", error: "Faltan datos"})
    }
        let result = await messagesModel.updateOne({_id: id_msg}, messagesToReplace)
        res.send({result: "success", payload: result})
})

//delete
router.delete("/:id_msg", async(req, res) => {
    let {id_msg} = req.params
    let result = await messagesModel.deleteOne({_id: id_msg})
    res.send ({result: "success", payload: result})
})

export default router 
