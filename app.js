const express = require("express");
const app = express()
const fs = require("fs");

//DB
const mongoose = require("mongoose");
const Operator = require("./models/Operator");

mongoose.connect('mongodb://localhost/r6-rest-api');
//Middlewares
app.use(express.json());


app.get('/',(req,res) => {
  res.end("Home");
});

//GET OPERATORS
app.get('/api/operators',async(req,res) => {
  const operators = await Operator.find();

  if(!operators)
    res.status(404).send("Operators not found!");

  res.send(operators);
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
  const logo = await Operator.findById(parseInt(req.params.id));
  res.end(logo)
})

//GET A OPERATOR IMAGE
app.get('/api/images/:id',async(req,res) => {
  const image = fs.readFileSync(__dirname + `/models/images/${req.params.id}.webp`);
  res.end(image)
})

const port = process.env.PORT || 2580;
app.listen(port,() => {
  console.log(`http://localhost:${port}`)
})