function PatientDAO(connection){
    this._connection = connection();
}

PatientDAO.prototype.insertPatient = function(dataPatient){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            console.log(dataPatient);
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
// console.log("DAO - delete patient ");
//var idPatient = {'_id': 'ObjectId('+idPatient._id+')'};
var envite = {};
envite = {'_id': 'ObjectId('+idPatient._id+')'};
    
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            console.log(envite);
            collection.remove(envite);
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return PatientDAO;
}
