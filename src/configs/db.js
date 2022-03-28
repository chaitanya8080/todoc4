

const mongoose = require("mongoose");

module.exports = ()=>{
    return mongoose.connect("mongodb+srv://chaitanya:girase123@cluster0.dypcc.mongodb.net/todo?retryWrites=true&w=majority")
}