const mongoose = require('mongoose');
// mongoose está sendo passado como parâmetro para mongoose-sequence
const mongooseSeq = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({
   nome: {
      type: String,
      required: true
   },
   endereco: {
      type: String
   },
   data_nascimento: {
      type: Date,
      required: true
   },
   telefone: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      index: {unique: true}
   },
   num_matricula: {
      type: Number,
      index: {unique: true}
   },
   cpf: {
      type: String,
      required: true,
      index: {unique: true}
   },
   rg: {
      type: String,
      required: true
   },
   turma: {
      type: mongoose.ObjectId,
      ref: 'Turma'
   }
});

// inc_field: o campo a ser autoincrementado
// start_seq: o número que irá iniciar a contagem. Default: 1
schema.plugin(mongooseSeq, {inc_field: 'num_matricula', start_seq: 1001});

module.exports = mongoose.model('Aluno', schema, 'alunos');