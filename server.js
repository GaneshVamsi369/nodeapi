const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const Product=require('./models/productmodel')
const dbHost = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
    res.send('Hello bloger!')
})
//get all products
app.get('/products',async(req,res)=>{
  try {
    const products=await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
//get single product
app.get('/product/:id',async(req,res)=>{
  try {
    const {id}=req.params
    const product=await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
//add new product
app.post('/products',async (req,res)=>{
  try{
    const product=await Product.create(req.body)
    res.status(200).json(product)
  }catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message})
  }
})
//update product(you can use put or patch)
app.put('/products/:id',async (req,res)=>{
  try{
    const {id}=req.params
    const product=await Product.findByIdAndUpdate(id,req.body);
    //if can't find product by id in database
    if(!product){
      return res.status(404).json({message:`cannot find any product with ID ${id}`})
    }
    const updatedproduct=await Product.findById(id)
    res.status(200).json(updatedproduct)
  }catch(error){
    res.status(500).json({message:error.message})
  }
})
//delete product
app.delete('/product/:id',async(req,res)=>{
  try {
    const {id}=req.params
    const product=await Product.findByIdAndDelete(id)
    //if can't find product by id in database
    if(!product){
      return res.status(404).json({message:`cannot find any product with ID ${id}`})
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
//connect with database
mongoose.connect(`mongodb+srv://${dbHost}:${dbPassword}@cluster0.a9ff9ol.mongodb.net/${process.env.DB_DATABASE}`)
.then(()=>{
  console.log("connected to mongoDB")
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((error)=>{
  console.log(error)
})