const Aluno = require('../models/Aluno');

const controller = {}; // Objeto vazio

// async: identifica funções cujas linhas
// de código podem não ser executadas
// sequencialmente

// await: identifica a linha de código
// que pode demorar a ser executada
controller.novo = async function(req, res) {
   try {
      await Aluno.create(req.body);
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
      // Retorna um vetor de alunos
      const alunos = 
         await Aluno
            .find()
            .populate('turma'); // Nome do *atributo*
      res.send(alunos); 
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500);
   }
}

controller.obterUm = async function(req, res) {
   try {
      const id = req.params.id;
      const aluno = await Aluno.findById(id);
      if(aluno) { // Se o aluno tiver sido encontrado
         res.send(aluno);
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
      const modificado = await Aluno.findOneAndUpdate({_id : id}, req.body);
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
      const excluido = await Aluno.findOneAndDelete({_id: id});
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