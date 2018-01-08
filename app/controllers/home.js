module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);

    patientDAO.listPatient(function(error, result){
        res.render("home/index", { patients: result });
    });
}

module.exports.cadasterPatient = function(application, req, res){

    var dataForm = req.body;
    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);
    
    //console.log(dataForm);
    patientDAO.insertPatient(dataForm);

    res.redirect("/");
}

module.exports.deletePatient = function(application, req, res){
    var idPatient = req.params;
    // console.log("Ops I did again");
    // console.log(idPatient);
    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);
    patientDAO.deletePatient(idPatient);
    res.redirect("/");
}

module.exports.editPatient = function(application, req, res){

    console.log("Edit oi");
}