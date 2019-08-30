const Professor = require('../models/Professor');

const controller = {}; // Objeto vazio

// async: identifica funções cujas linhas
// de código podem não ser executadas
// sequencialmente

// await: identifica a linha de código
// que pode demorar a ser executada
controller.novo = async function(req, res) {
   try {
      await Professor.create(req.body);
      // HTTP 201: Created
      res.sendStatus(201);
   }
   catch(erro) {
      console.error(erro);
      // HTTP 500: Internal Server Error
      res.sendStatus(500);
   }
}

controller.listar = async function(req, res) {
   try {
      // Retorna um vetor de professores
      const professores = await Professor.find();
      res.send(professores); 
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500);
   }
}

controller.obterUm = async function(req, res) {
   try {
      const id = req.params.id;
      const professor = await Professor.findById(id);
      if(professor) { // Se o professor tiver sido encontrado
         res.send(professor);
      }
      else {
         // HTTP 404: Not found
         res.sendStatus(404);
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500);
   }
}

controller.atualizar = async function(req, res) {
   try {
      const id = req.body._id;
      const modificado = await Professor.findOneAndUpdate({_id : id}, req.body);
      if(modificado) {
         // HTTP 204: No content
         res.sendStatus(204);
      }
      else {
         res.sendStatus(404);
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500);
   }
}

controller.excluir = async function(req, res) {
   try {
      const id = req.body._id;
      const excluido = await Professor.findOneAndDelete({_id: id});
      if(excluido) {
         res.sendStatus(204);
      }
      else {
         res.send(404);
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500);
   }
}

module.exports = controller;