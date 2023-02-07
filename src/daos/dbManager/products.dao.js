import { productModel } from "../../models/productModel.js";

class productDao{
    async getAll()
    {        
        products = await productModel.find()
        return products
    }
    async getAllByPages(page,limits)
    {
        let products = await productModel.paginate({},{page:page, limit:limits})
        return products
    }

    async getById(id)
    {
        return await productModel.findById(id)
    }

    async create(data)
    {
        return await productModel.create(data)
    }

    async update(id,data)
    {
        return await productModel.findByIdAndUpdate(id,data,{new:true})
    }

    async delete(id)
    {
        return await productModel.findByIdAndDelete(id)
    }

}
//productDao.plugin(mongoosePaginate)

export default new productDao()