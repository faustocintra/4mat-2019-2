const mongoose = require('mongoose');

const schema = mongoose.Schema({
   valor: {
      type: Number,
      required: true,
      min: 0,
      max: 10
   },
   avaliacao: {
      type: mongoose.ObjectId,
      ref: 'Avaliacao',
      required: true
   },
   aluno: {
      type: mongoose.ObjectId,
      ref: 'Aluno',
      required: true
   }
});

// Parâmetros de mongoose.model():
// 1º -> nome do model
// 2º -> estrutura de atributos do model (schema)
// 3º -> nome da collection do MongoDB onde
//       os objetos desse model serão armazenados
//       (geralmente, o nome do model em
//       minúsculas e no plural)
module.exports = mongoose.model('Nota', schema, 'notas');