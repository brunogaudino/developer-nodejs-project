module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);

    patientDAO.listPatient(function(error, result){
        //console.log(result);
        res.render("home/index", { patients: result });
    });
}

module.exports.cadasterPatient = function(application, req, res){

    var dataForm = req.body;
    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);
    
    console.log(dataForm);

    patientDAO.insertPatient(dataForm);

    res.redirect("/");
}

module.exports.editPatient = function(application, req, res){

    console.log("Edit oi");
}