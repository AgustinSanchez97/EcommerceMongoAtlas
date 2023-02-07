import { Schema, model } from "mongoose";
//import mongoosePaginate from "mongoose-paginate-v2"


const cartsCollection = "carts"


const cartSchema = new Schema({    
    products: {
        type:[
            {
                product: {type: Schema.Types.ObjectId, ref:"products"}
            }
        ],
        default: []
    },    
})

//productSchema.plugin(mongoosePaginate)

export const cartModel = model(cartsCollection, cartSchema)


