import { productModel } from "../../models/productModel.js";


class productDao{
    async getAll()
    {        
        const products = await productModel.find()
        return products
    }
    async getAllByPages(sortMethod,page,limits,orderMethod)
    {
        let options =
        {                        
            page:page,
            limit:limits,
            sort:{},
        }

        options.sort={price:1}
        
        let filters = {}

        if(sortMethod != null && sortMethod != "todos")
        {
            filters.category = sortMethod
        }
        
        //console.log(result)
        //let products = await productModel.find()
        let products = await productModel.paginate(productModel.find(filters),options)
        
        //let products = await productModel.find({description:"telefono"})
        
        //console.log(await productModel.find({description:"telefono"}))
        //let products = await productModel.paginate({},{page:page, limit:limits})
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