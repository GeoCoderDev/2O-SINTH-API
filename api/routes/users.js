const express = require("express");

const usersRouter = express.Router();


usersRouter.post("/:username",(req,res)=>{
    
    res.status(200).json({message:"Welcome to the user router"});
})


module.exports = usersRouter;