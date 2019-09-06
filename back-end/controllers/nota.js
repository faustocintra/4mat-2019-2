const Nota = require('../models/Nota');

const controller = {}; // Objeto vazio

controller.novo = async function(req, res) {
   try {
      await Nota.create(req.body);
      // HTTP 201: Created
      res.sendStatus(201).end();
   }
   catch(erro) {
      console.error(erro);
      // HTTP 500: Internal server error
      res.sendStatus(500).end();
   }
}

controller.listar = async function(req, res) {
   try {
      // find() sempre retorna um VETOR,
      // mesmo que vazio
      const notas = await 
         Nota.find()
         .populate('avaliacao') // Nome do *atributo* (minúsculo)
         .populate('aluno') // Nome do *atributo* (minúsculo)
      ;
      res.send(notas);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const nota = await Nota.findById(id);
      if(nota) {    // Nota encontrada (variável preenchida)
         res.send(nota);
      }
      else {      // Nota não encontrada (variável vazia)
         // HTTP 404: Not found
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.atualizar = async function(req, res) {
   const id = req.body._id;
   try {
      const nota = await Nota.findByIdAndUpdate(id, req.body);
      if(nota) {
         // HTTP 204: No content
         res.sendStatus(204).end();
      }
      else {
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.excluir = async function(req, res) {
   const id = req.body._id;
   try {
      const nota = await Nota.findByIdAndDelete(id);
      if(nota) {
         res.sendStatus(204).end();
      }
      else {
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

module.exports = controller;