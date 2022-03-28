


const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title:{type:String,require:true},
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", require:true}
    },
    {
        versionKey:false,
        timestamps:true
    }
    );

    module.exports = mongoose.model("todo",todoSchema);