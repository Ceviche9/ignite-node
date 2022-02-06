const express = require("express");
const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

/*
  TIpos de parâmetros

  Route Params => Identificar um recurso editar/deletar/buscar
  Query Params => Paginação / Filtro 
  BOdy Params => Os objetos para inserção/alteração (JSON) 

*/

app.post('/account', (request, response) => {
  const {cpf, name} = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if(customerAlreadyExists) {
    return response.status(400).json({error: "Customer already exists"});
  }

  customers.push({
    id: uuidv4(),
    name,
    cpf,
    statement: []
  })

  return response.status(201).send()
})

app.get('/statement/:cpf', (request, response) => {
  const {cpf} = request.params;

  const customer = customers.find(customer => customer.cpf === cpf)

  return response.json(customer.statement);
})

app.listen(3333, () => console.log("Server is running"))