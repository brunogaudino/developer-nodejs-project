module.exports = function(application){

    application.get('/', function(req, res){
        application.app.controllers.home.index(application,req,res);
    });

    application.post('/cadaster', function(req, res){
        application.app.controllers.home.cadasterPatient(application,req,res);
    });

    application.get('/edit/:name', function(req, res){
        var name = req.params.name;
        console.log(name);
        //application.app.controllers.home.cadasterPatient(application,req,res);
    });

}
