const mongoose = require('mongoose');

module.exports = function(uri) {
   mongoose.connect(uri);

   mongoose.connection.on('connected', function() {
      console.log('* Mongoose! conectado a ' + uri);
   });

   mongoose.connection.on('disconnected', function() {
      console.log('* Mongoose! desconectado de ' + uri);
   });

   mongoose.connection.on('error', function(erro) {
      console.log('* Mongoose! ERRO: ' + erro);
   });

   // Capturamos um sinal de encerramento (SIGINT), Ctrl+C
   process.on('SIGINT', function () {
      mongoose.connection.close(function () {
         console.log('* Mongoose! Desconectado pelo término da aplicação');
         // 0 indica que a finalização ocorreu sem erros 
         process.exit(0);
      });
   });
}