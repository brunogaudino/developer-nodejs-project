//Configurar express
var app = require("./config/server");

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Running server :)!");
  console.log("On port - " + port);
  console.log('To access an example app listening at http://localhost:' + port);
});
