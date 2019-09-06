const Avaliacao = require('../models/Avaliacao');

const controller = {}; // Objeto vazio

controller.novo = async function(req, res) {
   try {
      await Avaliacao.create(req.body);
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
      const avaliacoes = await 
         Avaliacao.find()
           .populate('turma') // Nome do *atributo* (minúsculo)
      ;
      res.send(avaliacoes);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const avaliacao = await Avaliacao.findById(id);
      if(avaliacao) {    // Avaliação encontrada (variável preenchida)
         res.send(avaliacao);
      }
      else {      // Avaliação não encontrada (variável vazia)
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
      const avaliacao = await Avaliacao.findByIdAndUpdate(id, req.body);
      if(avaliacao) {
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
      const avaliacao = await Avaliacao.findByIdAndDelete(id);
      if(avaliacao) {
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