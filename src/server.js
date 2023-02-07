import express, { query } from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import productsRouter from "./routes/products_routes.js"
import viewsRouter from "./routes/views_routes.js"
import mongoose from "mongoose";
import Handlebars from "handlebars";
import {allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access"




const app = express();

mongoose.set("strictQuery",true)
mongoose.connect("mongodb+srv://coder:coder123@coderhousehosting.xowlbyk.mongodb.net/ecommerce?retryWrites=true&w=majority", (error) =>
{
    if(error)
    {
        console.log("error al conectar a MongoDB", error)
    }
    else
    {
        console.log("Conectado a MongoDB")
    }
})




app.engine("hbs", handlebars.engine(
{
    extname: "hbs",
    defaultLayout: "main.hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}
))

app.set("view engine","hbs")
app.set("views",`${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Routers
app.use("/api/products", productsRouter)
app.use("/",viewsRouter)


app.listen(8080,() => {console.log("Escuchando en el puerto 8080")})


let products = []



//funciones
function arrayArrange(array, idToStart)
{
    idToStart = parseInt(idToStart)
    let productsReorderList = array.filter(product => product.id > idToStart)
    array.splice(idToStart)
    
    for (let i = 0; i < productsReorderList.length; i++) 
    {
        productsReorderList[i].id = idToStart + i
        array.push(productsReorderList[i])
    }        
}
    