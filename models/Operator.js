const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OperatorSchema = new Schema({
    _id:Number,
    logo:String,
    image:String,
    unit:String,
    name:String,
    side:String,
    role:String,
    stats:{
        type:Object,
        health:Number,
        speed:Number,
        difficulty:{type:Number,required:false}
    },
    unique_ability:String,
    loadout:{
        type:Object,
        primary:Array,
        secondary:Array,
        gadget:Array
    }
});

const Operator = mongoose.model("Operator",OperatorSchema);

module.exports = Operator;