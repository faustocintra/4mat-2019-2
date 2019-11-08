const mongoose = require('mongoose');

const schema = mongoose.Schema({
   nome: {
      type: String,
      required: true
   },
   dia_semana: {
      type: String,
      required: true,
      enum: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
   },
   horario_inicial: {
      type: String,
      required: true
   },
   horario_final: {
      type: String,
      required: true
   },
   data_inicial: {
      type: Date,
      required: true
   },
   data_final: {
      type: Date,
      required: true
   },
   professor: {
      type: mongoose.ObjectId,
      ref: 'Professor', // Nome do model referenciado
      required: true
   },
   curso: {
      type: mongoose.ObjectId,
      ref: 'Curso',  // Nome do model referenciado
      required: true
   }
});

module.exports = mongoose.model('Turma', schema, 'turmas');