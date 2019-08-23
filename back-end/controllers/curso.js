const Curso = require('../models/Curso');

const controller = {}; // Objeto vazio

// async: identifica funções cujas linhas
// de código podem não ser executadas
// sequencialmente

// await: identifica a linha de código
// que pode demorar a ser executada
controller.novo = async function(req, res) {
   try {
      await Curso.create(req.body);
      // HTTP 201: Created
      res.sendStatus(201);
   }
   catch(erro) {
      console.error(erro);
      // HTTP 500: Internal Server Error
      res.sendStatus(500);
   }
}

module.exports = controller;