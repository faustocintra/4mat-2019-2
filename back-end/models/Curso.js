const mongoose = require('mongoose');

const schema = mongoose.Schema({
   nome: {
      type: String,
      required: true
   },
   duracao_meses: {
      type: Number,
      required: true,
      default: 6  // Maioria dos cursos: 6 meses
   },
   carga_horaria: {
      type: Number,
      required: true,
      default: 96 // Maioria dos cursos: 96 horas
   },
   valor_total: {
      type: Number,
      required: true
   }
});

module.exports = mongoose.model('Curso', schema, 'cursos');