import { Router } from "express";
import productsDao from "../daos/dbManager/products.dao.js";
import cartDao from "../daos/dbManager/carts.dao.js";


const router = Router()

router.get("/", async (req,res) =>
{
    //let products = await productsDao.getAll()
    //res.render("index",{title: "home", products})
    const {page,limit}= req.query
    let products = await productsDao.getAllByPages(page||1,limit||4)
    //console.log(products)
    res.render("index",{
        title:"Products",
        products,
    })
    
})

router.get("/add/:id", async (req,res) =>
{
    const carts = await cartDao.getAll()
    let _carts = await cartDao
    
    let allCarts = await _carts.getAll()
    allCarts = [...allCarts]
    const product = await productsDao.getById(req.params.id)
    let cartsProducts = []
    //console.log(allCarts)

    for (let index = 0; index < allCarts.length; index++) {
        //await console.log(await cartDao.getById(allCarts[index].id))
        const cart = await cartDao.getById(allCarts[index].id)
        //console.log(cart?.products[index]?.product)
        for (let j = 0; j < cart?.products[index]?.product.length; j++) {
            const cartproducts = cart?.products[j]?.product[j]
            console.log(cartproducts)
            
        }
        //cartsProducts.push(cart.products)

    }
    //console.log(cartsProducts)

    // allCarts.forEach(cart => {
    //     //console.log(cart.id)
    //     console.log(cartDao.getById(cart.id))
        
    //     //cartDao.getById(cart)
    //     //cartsProducts.push(cart.products)
    //     //console.log(cart.products)
    // });
    res.render("add", {title:"AddProduct",product,carts,} )
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
    res.render("carts",{
        title:"Carts",
        carts
    })
})

router.get("/api/carts/:cid", async (req,res) =>
{
    console.log(cartDao.getById(req.params.id))
    //const cart = await cartDao.delete(req.params.id)
    res.redirect("/")
    res.render("delete", {title:"DeleteCart",cart})
})



router.get('/carts/:id', async (req, res) => 
{
    const product = await cartDao.getById(req.params.id)
    res.render("edit", {title:"Edit",product} )
})

/*
router.get("/api/carts/deleteCart/:id", async (req,res) =>
{
    try 
    {        
        const cart = await cartDao.delete(req.params.id)
        res.redirect("/api/carts")
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }
})
*/

export default router