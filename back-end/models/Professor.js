const mongoose = require('mongoose');

const schema = mongoose.Schema({
   nome: {
      type: String,
      required: true
   },
   formacao: {
      type: String
   },
   endereco: {
      type: String
   },
   telefone: {
      type: String,
      required: true
   },
   data_nascimento: {
      type: Date,
      required: true
   },
   cpf: {
      type: String,
      required: true,
      // Não pode repetir CPF no cadastro
      index: {unique : true}
   },
   rg: {
      type: String,
      required: true,
   },
   valor_hora_aula: {
      type: Number,
      required: true,
      default: 20,
      min: 15,
      max: 50
   },
   email: {
      type: String,
      required: true,
      // Não pode repetir e-mail no cadastro
      index: {unique : true}
   }   
});

module.exports = mongoose.model('Professor', schema, 'professores');