var auth = angular.module('auth', []);
auth.controller('authController', ['$scope', 'Users', function($scope, Plants){
    $scope.data = {};

    $scope.data.username = '';
    $scope.data.password = '';

    //TODO call this function inside the view when submitting the user you want to add
    $scope.addUser = function(){
      if($scope.data.username){
          Users.addUser($scope.data);
      } else{
          alert('You must enter a username');
      }
    }
}]);