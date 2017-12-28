module.exports.index = function(application, req, res){

  res.render("home/index");
/*
    var connection = application.config.dbConnection();
    var homeDAO = new application.app.models.HomeDAO(connection);
    homeDAO.list(function(error, result){
        res.render("home/index", {username: req.session.username, password: req.session.password, listHome:result});
    });
    connection.end();
    */
}
