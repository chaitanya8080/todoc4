const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstName:{type:String,require:true},
        lasttName:{type:String,require:false},
        email:{type:String,require:true,unique:true},
        password:{type:String,require:true}
    },
    {
        versionKey:false,
        timestamps:true
    }
    );
    userSchema.pre("save", function(next) {
       const hash = bcrypt.hashSync(this.password, 8 );
       this.password = hash;

       return next();
    });

    userSchema.methods.checkPassword = function(password){
        return bcrypt.compareSync(password,this.password);
    }

    module.exports = mongoose.model("user",userSchema);