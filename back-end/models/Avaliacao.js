const mongoose = require('mongoose');

const schema = mongoose.Schema({
   data_hora: {
      type: Date,
      required: true
   },
   conteudo: {
      type: String,
      required: true
   },
   duracao_horas: {
      type: Number,
      required: true,
      default: 1
   },
   turma: {
      type: mongoose.ObjectId,
      ref: 'Turma',
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
module.exports = mongoose.model('Avaliacao', schema, 'avaliacoes');