import { cartModel } from "../../models/cartModel.js";

class cartDao{
    async getAll()
    {        
        let carts = await cartModel.find()        
        return carts
    }
    /*
    async getAllByPages(page,limits)
    {
        let products = await cartModel.paginate({},{page:page, limit:limits})
        return products
    }
    */
    async getById(id)
    {
        return await cartModel.findById(id)
    }

    async create(data)
    {
        return await cartModel.create(data)
    }

    async update(id,data)
    {
        return await cartModel.findByIdAndUpdate(id,data)
    }

    async delete(id)
    {
        return await cartModel.findByIdAndDelete(id)
    }

}


export default new cartDao()