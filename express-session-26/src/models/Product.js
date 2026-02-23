const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
    name:{type:String, required:true ,trim: true , minlength: 3, maxlength: 120},
    price:{type:Number, required:true , min: 0},
    currency:{type:String, required:true , default: "USD" , trim: true , uppercase: true , maxlength: 3},
    inStock:{type:Boolean, required:true, default:true},
    description:{type:String, required:true , trim: true},
    tags:{type:[String], default: []},
    meta:{ type:Object, default:{}},
    createdAt:{type:Date, default: Date.now}

},
{timestamps: true}
);

const Product = mongoose.model('Product', productSchema);