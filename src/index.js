

const express = require("express");

const connect = require("./configs/db");

const app = express();

const userController = require("./controllers/user.controller");
const {register,login} = require("./controllers/auth.controller");
const todoController = require("./controllers/todo.controller");


app.use(express.json());

app.use("/users",userController);
app.post("/register",register);
app.post("/login",login);
app.use("/todos",todoController);

app.listen(8000,async(req,res)=>{
    try {
        await connect();
        console.log("port 8000");
    } catch (error) {
        console.log(error.message);
    }
})