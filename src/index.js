import express from 'express';
import {engine} from "express-handlebars";
import * as path from "path";
import __dirname from './utils.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cartsRouter from "./router/carts.routes.js"
import messagesRouter from "./router/messages.routes.js"
import productsRouter from "./router/products.routes.js"
import uploadRouter from "./router/upload.routes.js"



const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
});


mongoose.connect("mongodb+srv://luisalbertovalencia1966:2ogZdmSl9jWGJBAV@proyectocoder.sqvx5rc.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {
    console.log("Conectado a la base de datos ")
})
.catch(error=> {
    console.error("Error al intentar conectarse a la DB", error);
})

app.use("/api/carts", cartsRouter)
app.use("/api/msg", messagesRouter)
app.use("/api/prod", productsRouter)


app.use("/", uploadRouter)



//Handlebars 
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));
app.use("/", express.static(__dirname + "/public"))



app.get("/chat", async  (req, res) => {
    res.render("chat", {
        title: "chat con Mongoose",
    })
})


