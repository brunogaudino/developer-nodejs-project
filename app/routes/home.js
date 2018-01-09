module.exports = function(application){

    application.get('/', function(req, res){
        application.app.controllers.home.index(application,req,res);
    });

    application.post('/insert', function(req, res){
        application.app.controllers.home.insertPatient(application,req,res);
    });

    application.get('/delete/:idTimeStamp', function(req, res){
        application.app.controllers.home.deletePatient(application,req,res);
    });

    // application.put('/edit/:name', function(req, res){
    //     var name = req.params.name;
    //     console.log(name);
    //     //application.app.controllers.home.editPatient(application,req,res);
    // });

}
