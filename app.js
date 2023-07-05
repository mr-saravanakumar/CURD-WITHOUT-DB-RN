const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const userModel=require("./modules/user");
const cors=require('cors');

app.use(cors());
app.use(express.json());

var details=[];
var data={};

app.post("/insert",async(req, res) => {
    
        const {name,age}=req.body;
        var data={
            name:name,
            age:age,
        };
        details.push(data);
        res.json({message:"user created..."});
        
})

app.get("/fetchdata",(req,res)=>{
    res.json(details);
})

app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    console.log(id);
    details.forEach((d)=>{
        if(id==details.indexOf(d)){
            details.splice(id,1);
            res.json({message:"user deleted.."});
        }
    })
})


app.put("/update",(req, res)=>{
    const {id,newdata}=req.body;
    console.log(id,newdata);
    details.forEach((d)=>{
    console.log(d.name+' '+d.age);
   })
   details.forEach((d)=>{
    if(id==details.indexOf(d))
    {
       console.log(d.name);
       d.name=newdata;
       res.json({message:"updated...."});
    }
   })
})

app.listen(3001,()=>{
    console.log("connected......");
});