module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);


    //console.log("Result " + patientDAO.listPatient());
    // res.send(
        // patientDAO.listPatient(function(error, result){
        //     console.log("List " + result);
        //     res.render("home/index");
        // });
    // );
    console.log( patientDAO.listPatient() );
    res.render("home/index");

}

module.exports.cadasterPatient = function(application, req, res){

    var dataForm = req.body;
    var connection = application.config.dbConnection;
    var patientDAO = new application.app.models.PatientDAO(connection);
    
    patientDAO.insertPatient(dataForm);

    res.redirect("/");
}