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

PatientDAO.prototype.listPatient = function(callback){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.find({}, function(err, patients){
                patients.toArray(callback);
            });
            mongoclient.close();
        });
    });
}

PatientDAO.prototype.deletePatient = function(idPatient){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.remove({'idTimeStamp': idPatient});

            mongoclient.close();
        });
    });
}

module.exports = function(){
    return PatientDAO;
}
