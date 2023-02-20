import express, { query } from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import productsRouter from "./routes/products_routes.js"
import viewsRouter from "./routes/views_routes.js"
import cartsRouter from "./routes/carts_routes.js"
import mongoose from "mongoose";
import Handlebars from "handlebars";
import {allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access"
import cookieParser from "cookie-parser";
import session_routes from "./routes/session_routes.js"
import MongoStore from "connect-mongo";
import session from "express-session";
import initializePassport from "./config/passportConfig.js";
import passport from "passport";

const app = express();


app.set("view engine","hbs")
app.set("views",`${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://coder:coder123@coderhousehosting.xowlbyk.mongodb.net/ecommerce?retryWrites=true&w=majority",
        mongoOptions: {
            useNewUrlParser:true,
            useUnifiedTopology:true
        },
        ttl: 60

    }), 

    secret:"coderhouse",
    resave:false,
    saveUninitialized:false
}))


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


//PASSPORT
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



//HANDLEBARS
app.engine("hbs", handlebars.engine(
    {
        extname: "hbs",
        defaultLayout: "main.hbs",
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }
))



//Routers
app.use("/api/products", productsRouter)
app.use("/",viewsRouter)
app.use("/api/carts",cartsRouter)
app.use("/session",session_routes)


app.listen(8080,() => {console.log("Escuchando en el puerto 8080")})





