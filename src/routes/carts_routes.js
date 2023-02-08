import cartsDao from "../daos/dbManager/carts.dao.js"
import { Router } from 'express'
const router = Router()


//crear carrito vacio
router.post("/" , async (req,res) => {
    try 
    {
        const cart = await cartsDao.create()
        res.redirect("/api/carts/")        
    }catch (error)
    {
        res.status(500).json({ error: error.message });
    }
})
//actualizar carro
router.put("/:id", async (req,res) => {
    
    try 
    {
        //await console.log( await req.params.id)
        const cart = await cartsDao.update(req.params.id, req.body)
        res.json(req.body)
        /*
        const cart = await cartsDao.update(req.params.id, req.body)
        res.json(cart)
        */
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }

})
//Actualiza el producto en el carro especifico
router.put("/:cid/product/:pid" ,async (req,res) => {

})
/*
router.post("/:cid/product/:pid" ,(req,res) => {

})
*/
//borrar producto especifico de carrito
router.delete("/:cid/products/:pid" ,async (req,res) => {

})

//borrar carrito especifico
router.delete("/:id",async (req,res) => {
    try 
    {                
        const cart = await cartsDao.delete(req.params.id)
        res.json(cart)
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }
})


export default router