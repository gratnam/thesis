  var dashboard = angular.module('dashboard', []);
dashboard.controller('dashboardController', ['Plants', 'auth', '$window', '$q','Events', function(Plants, auth, $window, $q, Events){
  var that = this;
  that.data = {};
  that.data.username = $window.localStorage.getItem('username');
  that.data.plants = [];
  that.totalFlowers = 0;
  that.totalHousePlants = 0;
  that.totalFruits = 0;
  that.totalVegetables = 0;
  that.totalHerbs = 0;
  that.totalShrubs = 0;
  that.total_Flowers_HousePlant = 0;
  that.total_Fruits_Vegetables = 0;
  that.total_Herbs_Shrubs = 0;
  that.totalPlants = 0;

  that.getEvents = function(){
    Events.getUserEvents(that.data)
      .then(function(results){
        console.log('SUCCESS IN getUserEvents CONTROLLER', results);
        //results in an array of objects
        // TODO possible convert ms back into time
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETUSEREVENTS CONTROLLER');
      })
  }

  that.getEvents();

  that.getSpecieInfo = function(index, plant){
    return Plants.getSpecieById(plant)
      .then(function(speciesResult){
        that.data.plants[index].speciesInfo = speciesResult.data;
      })
      .catch(function(error){
        console.log(error);
      });
  };

  that.getAllPlantsSpeciesInfo = function(array){
    var myPromises = [];
    for(var i = 0; i < that.data.plants.length; i++){
       myPromises[i] = that.getSpecieInfo(i, that.data.plants[i]);
    }
    $q.all(myPromises).then(function(){
      that.getPlantStats();
    })
  };

  that.getUserPlants = function(){
    Plants.getUsersPlants(that.data)
      .then(function(plantResults){
        that.data.plants = plantResults.data;
        that.getAllPlantsSpeciesInfo(that.data.plants);
      })
      .catch(function(error){
        console.log(error);
      });
  };

  that.getPlantStats = function(){
    for(var i = 0; i < that.data.plants.length; i++) {
      var curSpeciesType = that.data.plants[i].speciesInfo.typeOf;
      if(curSpeciesType === 'Flower'){
        that.totalFlowers++;
      }
      if (curSpeciesType === 'Houseplant'){
        that.totalHousePlants++;
      }
      if (curSpeciesType === 'Fruit'){
        that.totalFruits++;
      }
      if (curSpeciesType === 'Vegetable'){
        that.totalVegetables++;
      }
      if (curSpeciesType === 'Herb'){
        that.totalHerbs++;
      }
      if (curSpeciesType === 'Shrub'){
        that.totalShrubs++;
      }
      that.totalPlants = that.data.plants.length;
    }
    that.total_Flowers_HousePlant = that.totalFlowers + that.totalHousePlants;
    that.total_Fruits_Vegetables = that.totalFruits + that.totalVegetables;
    that.total_Herbs_Shrubs = that.totalHerbs + that.totalShrubs;
  };
  that.getUserPlants();
  that.getPlantStats();

}]);
