var auth = angular.module('auth', []);
auth.controller('authController', ['$scope', 'Users', function($scope, Plants){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    // Functions
    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $scope.createUser = function(){

      // Grabs all of the text box fields
      var userData = {
          username: $scope.formData.username,
          password: $scope.formData.password,
          email: $scope.formData.email,
          location: [$scope.formData.longitude, $scope.formData.latitude],
          userPic: $scope.formData.userPic,
          // htmlverified: $scope.formData.htmlverified,
      }

      Users.addUser(userData);

    }
}]);