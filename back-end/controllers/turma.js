const Turma = require('../models/Turma');

const controller = {}; // Objeto vazio

// async: identifica funções cujas linhas
// de código podem não ser executadas
// sequencialmente

// await: identifica a linha de código
// que pode demorar a ser executada
controller.novo = async function(req, res) {
   try {
      await Turma.create(req.body);
      // HTTP 201: Created
      //res.sendStatus(201);
      res.status(201).send('');
   }
   catch(erro) {
      console.error(erro);
      // HTTP 500: Internal Server Error
      res.sendStatus(500);
   }
}

controller.listar = async function(req, res) {
   try {
      // Retorna um vetor de turmas
      const turmas = 
         await Turma
            .find()
            .populate('professor') // Nome do *atributo*
            .populate('curso'); // Nome do *atributo*
      res.send(turmas); 
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500);
   }
}

controller.obterUm = async function(req, res) {
   try {
      const id = req.params.id;
      const turma = await Turma.findById(id);
      if(turma) { // Se a turma tiver sido encontrado
         res.send(turma);
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
      const modificado = await Turma.findOneAndUpdate({_id : id}, req.body);
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
      const excluido = await Turma.findOneAndDelete({_id: id});
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