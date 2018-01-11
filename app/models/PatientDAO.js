function PatientDAO(connection){
    this._connection = connection();
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

PatientDAO.prototype.insertPatient = function(dataPatient){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.insert(dataPatient);

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

PatientDAO.prototype.editPatient = function(idPatient, callback){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){

            collection.find({'idTimeStamp': idPatient}, function(err, patients){
                patients.toArray(callback);
            });

            mongoclient.close();
        });
    });
}

PatientDAO.prototype.updatePatient = function(dataPatient, callback){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.update({'idTimeStamp': dataPatient.idTimeStamp},{$set: dataPatient});

            mongoclient.close();
        });
    });
}

module.exports = function(){
    return PatientDAO;
}
