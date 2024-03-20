const mongoose=require('mongoose')

const productschema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please enter a product name"]
        },
        quantity:{
            type:Number,
            required:true,
            default:0
        },
        price:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true
    }
)
const Product=mongoose.model('Product',productschema);
module.exports=Product;