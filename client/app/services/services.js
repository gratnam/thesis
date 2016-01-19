var services = angular.module('services', []);
services.factory('Plants', ['$http', function($http){

  var addPlant = function(plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/addPlant',
      params: plant
    }).then(function(response) {
      console.log('SUCCESSFUL POST FOR ADDPLANT')
    }).catch(function(error) {
      console.log(error);
    });
  }

  var addUser = function(user) {
    return $http({
      method: 'POST',
      url: 'api/users/addUser',
      params: user
    }).then(function(response) {
      console.log('SUCCESSFUL POST FOR ADDUSER')
    }).catch(function(error) {
      console.log(error);
    });
  }
  
  return {
    addPlant: addPlant,
    addUser: addUser
  }
}]);
