import { Schema, model, SchemaType } from "mongoose";
//import mongoosePaginate from "mongoose-paginate-v2"


const cartsCollection = "carts"


const cartSchema = new Schema({    
    products: {
        type:[
            /*{
                 productId: {type: String, required: true},
                 quantity: {type: Number, required: true},
            }*/
        ],
        default: []
    },    
})

//productSchema.plugin(mongoosePaginate)

export const cartModel = model(cartsCollection, cartSchema)


