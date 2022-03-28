

const express = require("express");

const user = require("../models/user.model");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("",authenticate, async(req,res)=>{
    req.body.userId = req.userId
    try {
        const todo = await Todo.create(req.body);
        return res.status(200).send(todo);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
})


module.exports = router;