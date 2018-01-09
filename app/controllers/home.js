module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);

    patientDAO.listPatient(function(error, result){
        res.render("home/index", { patients: result });
    });
}

module.exports.cadasterPatient = function(application, req, res){

    var dataForm = req.body;
    var timestamp = new Date().getTime();
    dataForm.idTimeStamp = timestamp.toString();

    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);

    //console.log(dataForm); 
    //console.log("timeStamp " + timestamp);
    patientDAO.insertPatient(dataForm);

    res.redirect("/");
}

module.exports.deletePatient = function(application, req, res){
    var idPatient = req.params.idTimeStamp.toString();
    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);
    console.log(req.params);
    //patientDAO.deletePatient(idPatient);
    res.redirect("/");
}

module.exports.editPatient = function(application, req, res){

    console.log("Edit oi");
}