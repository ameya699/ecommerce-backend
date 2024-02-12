const express=require("express");
const PORT=4000;
const app=express();
const mongoose=require("mongoose");
const Product=require("./models/product");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const dbConnect=require("./config/dbConnect");
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload=multer({storage:storage});
app.use(express.json());
app.use(cors());
app.use('/images',express.static('upload/images'));

app.listen(PORT,async()=>{
    await dbConnect();
    console.log(`Listening on ${PORT}`);
})

app.get('/',(req,res)=>{
    res.json({status:"server running on "+PORT.toString()});
})

//upload endpoint 
app.post('/upload',upload.single('product'),(req,res)=>{
    try{res.json({
        success:1,
        image_url:`http://localhost:${PORT}/images/${req.file.filename}`
    })}
    catch(err){
        res.json({status:"failed",message:err})
    }
})

//create schema for add product

app.post('/addproduct',async(req,res)=>{
    const {id,name,image,category,new_price,old_price}=req.body;
    const newProduct=await Product.create({
        id,name,image,category,new_price,old_price
    });
    console.log(newProduct);
    
    res.json(req.body);
})

