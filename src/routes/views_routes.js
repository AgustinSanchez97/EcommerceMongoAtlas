import { Router } from "express";
import productsDao from "../daos/dbManager/products.dao.js";


const router = Router()

router.get("/", async (req,res) =>
{
    //let products = await productsDao.getAll()
    //res.render("index",{title: "home", products})
    const {page,limit}= req.query
    let products = await productsDao.getAllByPages(page||1,limit||2)
    console.log(products)
    res.render("index",{
        title:"Products",
        products
    })
    
})

router.get("/edit/:id", async (req,res) =>
{
    const product = await productsDao.getById(req.params.id)
    res.render("edit", {title:"Edit",product} )
})

router.get("/delete/:id", async (req,res) =>
{
    const product = await productsDao.delete(req.params.id)
    res.redirect("/")
    res.render("delete", {title:"Delete",product} )
})


export default router