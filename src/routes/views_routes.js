import { Router } from "express";
import productsDao from "../daos/dbManager/products.dao.js";
import cartDao from "../daos/dbManager/carts.dao.js";


const router = Router()

router.get("/", async (req,res) =>
{
    const {page,limit,category,sortMethod}= req.query

    let products = await productsDao.getAllByPages(category,page||1,limit||4,sortMethod)
    
    
    
    let allProducts = await productsDao.getAll()

    let allCategories = []
    allCategories.push("todos")

    allProducts.forEach(product => {        
        if(allCategories.find(category => category == product.category) != null||product.category == undefined) return
        allCategories.push(product.category)
    });

    let actualSort = ""
    if(sortMethod!=undefined) actualSort = sortMethod

    let actualCategory = "todos"
    if(category!=undefined) actualCategory = category

    
    res.render("index",{
        title:"Products",
        products,allCategories,actualCategory,user:req.session.user,actualSort
    })
    
})

router.get("/add/:id", async (req,res) =>
{
    const carts = await cartDao.getAll()

    let allCarts = [...carts]
    const product = await productsDao.getById(req.params.id)
    let cartsProducts = []

    for (let index = 0; index < allCarts.length; index++) {
        const cart = await cartDao.getById(allCarts[index].id)
        if(cart?.products.length == 0)
        {
            const _product = 
            {
                cartId:cart.id,
                productID:product.id,
                quantity:"0"
            }
            cartsProducts.push(_product)

        }        
        for (let j = 0; j < cart?.products?.length; j++) {

            const cartproducts = cart?.products[j]?.product[0]
            const cartproducts2 = cart?.products[j]?.product[1]

            if(cartproducts == product.id) 
            {
                const _product =
                {
                    cartId:cart.id,
                    productID:cartproducts,
                    quantity:cartproducts2
                }
                cartsProducts.push(_product)
            }
        }
    }
    res.render("add", {title:"AddProduct",product,carts,} )
})
router.get("/editCart/:id", async (req,res) =>
{
    const cart = await cartDao.getById(req.params.id)
    //console.log(cart.products)
    const productsData = cart.products
    res.render("editCart", {title:"EditCart",cart,productsData} )
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
    res.redirect("/")
    res.render("delete", {title:"DeleteCart",cart})
})

router.get('/carts/:id', async (req, res) => 
{
    const product = await cartDao.getById(req.params.id)
    res.render("edit", {title:"Edit",product} )
})

const isSession = (req,res,next)=>{
    //if(req.session.user) return res.redirect("/profile")

    next()
}

router.get("/login", isSession,(req,res)=>{
    res.render("login")
})
router.get("/register",isSession,(req,res)=>{
    res.render("register")
})
router.get("/profile",(req,res)=>{
    if(!req.session.user) return res.redirect("/login")

    res.render("profile",{user:req.session.user})
})


export default router