const express = require("express");
const app = express();
const fs = require("fs");

//DB
const mongoose = require("mongoose");
const Operator = require("./models/Operator");

mongoose.connect('mongodb://localhost/r6-rest-api').then(() => {
  console.log("DB Connected")
}).catch((err) => {
  console.log(err);
})

//Middlewares
app.use(express.json());

//HOME
app.get('/',(req,res) => {
  res.end("Home");
});

//GET OPERATORS
app.get('/api/operators',async(req,res) => {
  //Queries
  const qName = req.query.name;
  const qUnit = req.query.unit;
  const qSide = req.query.side;

  let operators;

  //If query exist
  if(qName){
    operators = await Operator.find({name: { $regex: qName, $options:'i'} });
  }else if(qUnit){
    operators = await Operator.find({unit: { $regex: qUnit, $options:'i'} });
  }else if(qSide){
    operators = await Operator.find({side: { $regex: qSide, $options:'i'} });
  }else
    operators = await Operator.find();
  
  if(!operators)
    res.status(404).send("Operators not found!");

  res.send(operators)
})

//GET A OPERATOR
app.get('/api/operators/:id',async(req,res) => {
  const operator = await Operator.findById(parseInt(req.params.id));

  if(!operator)
    res.status(404).send("The operator with the given ID was not found")

  res.send(operator);
})

//GET A OPERATOR LOGO
app.get('/api/logos/:id',async(req,res) => {
  const logoId = req.params.id;
  const logo = fs.readFileSync(__dirname + `/models/logos/${logoId}.png`)

  if(!logo)
    res.status(404).send("Not found")

  res.end(logo)
})

//GET A OPERATOR IMAGE
app.get('/api/images/:id',async(req,res) => {
  const imgId = req.params.id;
  const image = fs.readFileSync(__dirname + `/models/images/${imgId}.png`);

  if(!image)
    res.status(404).send("Not found")

  res.end(image)
})



const port = process.env.PORT || 2580;
app.listen(port,() => {
  console.log(`http://localhost:${port}`)
})