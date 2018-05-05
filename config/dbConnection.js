/* importar mongodb */
var mongo = require('mongodb');

var connMongoDB = function(){
    var db = new mongo.Db(
        'db_nutrition', //nome do banco
        //Instancia parametros conexão
        new mongo.Server(
          'localhost', //string contendo o endereço do servidor
          27017, //Porta de conexão
          {} //Objeto com opções de configurações do servidor
        ),
        {}
      );
      return db;
}

module.exports = function(){
    return connMongoDB;
};