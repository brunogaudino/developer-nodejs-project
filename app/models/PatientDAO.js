function PatientDAO(connection){
    this._connection = connection();
}

PatientDAO.prototype.insertPatient = function(dataPatient){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.insert(dataPatient);

            mongoclient.close();
        });
    });
}

PatientDAO.prototype.listPatient = function(){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.find({}, function(err, results){
                //console.log("resultsDAO " + results);
                return results;
            });
            // collection.find({}, function(err, results){
            //     //console.log(results);
            //     return results;
            // });
            //mongoclient.close();
        });
    });
}

module.exports = function(){
    return PatientDAO;
}
