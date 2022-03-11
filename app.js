const express = require("express");
const app = express()
const fs = require("fs");

//Middlewares
app.use(express.json());


app.get('/',(req,res) => {
  res.end("Home");
});

//GET OPERATORS
app.get('/api/operators',(req,res) => {
  const operators = JSON.parse(fs.readFileSync(__dirname + "/models/data.json","utf-8"))
  res.send(operators);
})

//GET A OPERATOR
app.get('/api/operators/:id',(req,res) => {
  const operators =  JSON.parse(fs.readFileSync(__dirname + "/models/data.json","utf-8"));
  let operator;

  //Searchs operator
  for(let i=0;i<operators.length;i++){
    if(operators[i].id == parseInt(req.params.id))
      operator = operators[i];
  }

  if(!operator)
    res.status(404).send("The operator with the given ID was not found")

  res.send(operator);
})

//GET A OPERATOR LOGO
app.get('/api/logos/:id',(req,res) => {
  const logo = fs.readFileSync(__dirname + `/models/logos/${req.params.id}.png`);
  res.end(logo)
})

//GET A OPERATOR IMAGE
app.get('/api/images/:id',(req,res) => {
  const image = fs.readFileSync(__dirname + `/models/images/${req.params.id}.webp`);
  res.end(image)
})

const port = process.env.PORT || 2580;
app.listen(port,() => {
  console.log(`http://localhost:${port}`)
})