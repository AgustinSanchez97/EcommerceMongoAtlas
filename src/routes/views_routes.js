import { Router } from "express";
import productsDao from "../daos/dbManager/products.dao.js";
import cartDao from "../daos/dbManager/carts.dao.js";


const router = Router()

router.get("/", async (req,res) =>
{
    //let products = await productsDao.getAll()
    //res.render("index",{title: "home", products})
    const {page,limit}= req.query
    let products = await productsDao.getAllByPages(page||1,limit||2)
    //console.log(products)
    res.render("index",{
        title:"Products",
        products,
    })
    
})

router.get("/add/:id", async (req,res) =>
{
    let carts = await cartDao.getAll()
    const product = await productsDao.getById(req.params.id)
    res.render("add", {title:"AddProduct",product,carts} )
})


router.get("/edit/:id", async (req,res) =>
{
    const product = await productsDao.getById(req.params.id)
    res.render("edit", {title:"EditProduct",product} )
})

router.get("/delete/:id", async (req,res) =>
{
    const product = await productsDao.delete(req.params.id)
    res.redirect("/")
    res.render("delete", {title:"DeleteProduct",product} )
})




router.get("/api/carts/" ,async (req,res) => {    
    let carts = await cartDao.getAll()
    console.log(carts)
    res.render("carts",{
        title:"Carts",
        carts
    })
})

router.get("/api/carts/:cid", async (req,res) =>
{
    
    res.redirect("/")
    res.render("add", {title:"AddProduct",product} )
})

router.get('/carts/:id', async (req, res) => 
{
    const product = await cartDao.getById(req.params.id)
    res.render("edit", {title:"Edit",product} )
})


export default router