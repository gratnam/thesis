var plantProfile = angular.module('plantProfile', []);
plantProfile.controller('plantProfileController',['$scope', 'Plants', '$state','ProfileInfo', function($scope, Plants, $state, ProfileInfo){
    $scope.data = {};
    $scope.data.nickname = $state.params.nickname;
    $scope.data.generalPlantInfo;
    console.log($scope.data.nickname, 'NICKNAME') //TODO: Make sure this is what we want
    $scope.data.specificPlantInfo;
    $scope.data.generalPlantInfo;
    $scope.data.botanicalName = $state.params.botanicalName;
    $scope.data.id;
    // $scope.data.commonName ;


    $scope.getPlant = function(){
      console.log($scope.data.botanicalName, 'oh hello ')
      Plants.getPlant($scope.data)
        .then(function(getPlantData) {
          // console.log(getPlantData.data.idOfSpecies, 'TODO GET WHAT YOU NEED FROM THE DATA GETPLANT');
          $scope.data.id = getPlantData.data.idOfSpecies;
          $scope.getSpecieInfoOfPlant();

        })
        .catch(function(error) {
          console.log(error, 'ERROR IN GETPLANT CONTROLLER')
        })
    };

    $scope.getSpecieInfoOfPlant = function(){
      console.log($scope.data.id, "WJKLJERKLJKJRLWRWKERJKL")
      Plants.getSpecieById($scope.data)
        .then(function(getSpecieInfoOfPlantdata) {
          console.log(getSpecieInfoOfPlantdata, '#@@#TODO GET WHAT YOU NEED FROM THE DATA GETSPECIEINFOOFPLANT');
          $scope.data.generalPlantInfo = getSpecieInfoOfPlantdata;
        })
        .catch(function(error) {
          console.log(error, 'ERROR IN GETSPECIEINFOOFPLANT CONTROLLER');
        })
    };

    //immediately called when controller is loaded
    $scope.getPlant();



}]);
