var usersHandler = require('./usersHandler.js');

module.exports = function(app){
  app.post('/addUser', usersHandler.addUser);
};