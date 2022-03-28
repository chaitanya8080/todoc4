

const express = require("express");

const Todo = require("../models/todo.model");

const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("", authenticate , async ( req,res)=>{


    req.body.userId = req.userID;
    try {
        const todo = await Todo.create(req.body);

        return res.status(200).send(todo);
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.get("", async (req, res) => {
    try{
        const todo = await Todo.find()
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.get("/:id", async (req, res) => {
    req.body.userId = req.userID;
    try{
        const todo = await Todo.findById(req.params.id).lean().exec();
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})


router.patch("/:id",authenticate, async (req,res)=>{
    req.body.userId = req.userID;
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
        return res.status(200).send(todo);
    } catch (err) {
        res.status(400).send({message:err.message});
    }
})

router.delete("/:id",authenticate, async (req,res)=>{
    req.body.userId = req.userID;
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(todo);
    } catch (err) {
        res.status(400).send({message:err.message});
    }
})



module.exports = router;