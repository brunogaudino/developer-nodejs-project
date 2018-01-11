module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);
    var editForm = false;

    patientDAO.listPatient(function(error, result){
        res.render("home/index", { patients: result, flagForm: editForm });
    });
}

module.exports.insertPatient = function(application, req, res){

    var dataForm = req.body;
    var timestamp = new Date().getTime();
    dataForm.idTimeStamp = timestamp.toString();

    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);
    
    patientDAO.insertPatient(dataForm);

    res.redirect("/");
}

module.exports.deletePatient = function(application, req, res){
    
    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);

    patientDAO.deletePatient(req.params.idTimeStamp.toString());

    res.redirect("/");
}

module.exports.editPatient = function(application, req, res){

    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);

    patientDAO.editPatient(req.params.idTimeStamp.toString(), function(error, result){
       res.render("home/edit-page", { patients: result});
    });

}

module.exports.updatePatient = function(application, req, res){
    
    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);

    patientDAO.updatePatient(req.body);

    res.redirect("/");

}