var db = require('./sequelize.js');

var helpers = {

  //user is an object with keys: username, password, email, location, userPic, nickname
  addUser : function(user) {
    // Check for commonName in Users table
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
       if(userResult){
         throw Error('Username is already taken');
       }
       //Create a user in the Users table
       return db.Users.create(user);
    })
    .catch(function(error) {
       console.log('Error adding user to the database ', error);
    })
  },

  //plant is an object with username, commonName, gardenName, plantDate nickname, plantStatus
  addPlant : function(plant) {
    var plantObj = {};
    //Check for username in Users Table 
    return db.Users.findOne({
      where: {username: plant.username}
    })
    .then(function(userResults) {
      if(!userResults) {
        throw Error('Username does not exist');
      }
      console.log('User ID exists: ', userResults);
      plantObj.userResults = userResults; 

        //Check for commonName in SpeciesInfos table
        return db.SpeciesInfos.findOne({
          where: {commonName: plant.commonName}
        })
        .then(function(speciesResults) {
          if(!speciesResults) {
            throw Error('Species does not exist');
          }
          console.log('Species exists: ', speciesResults);
          plantObj.speciesResults = speciesResults; 

            // Check for gardenName in Gardens table
            return db.Gardens.findOne({
              where: {gardenName: plant.gardenName}
            })
            .then(function(gardenResults) {
              if(!gardenResults) {
                throw Error('Garden does not exist');
              }
              console.log('Garden exists: ', gardenResults);
              plantObj.gardenResults = gardenResults; 

                // Insert plant into Plant table
                return db.Plants.create({
                  idOfUser: plantObj.userResults.id,
                  idOfSpecies: plantObj.speciesResults.id,
                  plantDate: plant.plantDate,
                  nickname: plant.nickname,
                  plantStatus: plant.plantStatus,
                  idOfGarden: plantObj.gardenResults.id
                })
                .then(function(plantResults) {
                  console.log('Add plant successful');
                })
                .catch(function(error) {
                   console.log('Error adding plant to the database ', error);
                })
            })
        })
    })
  },

  //garden is an object with gardenName
  addGarden : function(garden) {
    //Check for gardenName in Gardens table
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(gardenResult){
        throw Error('Garden name is already taken');
      }
      //Insert garden into Garden table
      return db.Gardens.create(garden);
    })
    .catch(function(error) {
      console.log('Error adding garden to database ', error);
    })
  },

  //species is an object with commonName,botanicalName, plantLink, plantPic, wateringInformation, germinationInformation, locationInformation
  addSpeciesInfo : function(species) {
    //Check for commonName in SpeciesInfos table
    return db.SpeciesInfos.findOne({
      where: {commonName: species.commonName}
    })
    .then(function(speciesResult) {
      if(speciesResult){
        throw Error('Species info is already in database');
      }
      // Insert species into SpeciesInfos table
      return db.SpeciesInfos.create({
        commonName: species.commonName,
        botanicalName: species.botanicalName,
        plantPic: species.plantPic,
        plantLink: species.plantLink,
        wateringInformation: species.wateringInformation,
        typeOf: species.typeOf,
        exposure: species.exposure,
        generalInformation: species.generalInformation,
        plantingGuide: species.plantingGuide,
        pestsDiseases: species.pestsDiseases,
        careGuide: species.careGuide
      })
    })
    .then(function(speciesResult) {
      console.log('add species successful');
    })
    .catch(function(error) {
      console.log('Error adding species to database ', error);
    })
  },

  //plant is an object with plantId, commonName
  //garden is an object with gardenName
  addGardenToPlant : function(plant, garden) {
    var plantObj = {};
    // Check for Gardens gardenName
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden name does not exist');
      }
      console.log('Garden name exists: ', gardenResult.gardenName);
      plantObj.gardenId = gardenResult.id;
      // Check for Plants gardenId
      return db.Plants.findOne({ 
        where: {plantId: plant.plantId}
      })
      .then(function(plantResult) {
        if(!plantResult) {
          throw ERROR('Plant ID does not exist');
        }
        console.log('Plant name exists: ', plantResult);
          //set idOfGarden 
          return db.Plants.set({
            idOfGarden: plantObj.gardenId
          })
        })
        .then(function(addPlantToGardenResult) {
          console.log('Add plant to garden successful');
        })
        .catch(function(error) {
           console.log('Error adding plant to the database ', error);
        })
    })
  },

  //addGardenToUser : function(user, garden) {

  // }, // future feature

  //user is an object with username
  getUser : function(user) {
    //Check for username in Users table
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw ERROR('Username does not exist');
      }
      console.log('Username exists: ', userResult.username);
    })
  },

  //garden is an object with gardenName
  getGarden : function(garden) {
    gardenObj = {};
    //Check for gardenName in Gardens table 
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden name does not exist');
      }
      console.log('Garden name: ', gardenResult.gardenName);
      gardenObj.gardenId = gardenResult.id;
      //Check for idOfGarden in Plants table
      return db.Plants.getOne({
        where: {idOfGarden: gardenObj.gardenId}
      })
      .then(function(plantResult) {
        if(!plantResult) {
          throw ERROR('No plants associated with this garden');
        }
        console.log('Plants associated with this garden ', plantResult);
      })
      .catch(function(error) {
      console.log('Error, retrieving garden ', error);
      })
    })
  },

  //species is an object with commonName
  getSpeciesInfo : function(species) {
    //Check for commonName in SpeciesInfos table
    return db.SpeciesInfos.findOne({
      where: {commonName: species.commonName}
    })
    .then(function(specieResult) {
      if(!specieResult) {
        throw ERROR('Species does not exist');
      }
      return specieResult;
    })
    .catch(function(error) {
      console.log('Error, retrieving speciesInfo: ', error);
    })
  },

  //plant is an object with nickname
  getPlantByNickname : function(plant) {
    //Check for nickname in Plants table
    return db.Plants.findOne({
     where : {nickname: nickname}
    })
    .then(function(plantResult) {
         if(!userResult) {
            throw ERROR ('Plant nickname does not exist');
        }
        console.log ('Plant exists: ' , plantResult);
    })
  },

  //user is an object with username
  getUserPlants : function(user) {
    var userId;
    //Check for username in Users table
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw ERROR('User does not exist');
      }
      console.log('User associated with this plant: ', error);
      //set userId variable for future use
      userId = userResult.id;
      //findAll plants in the Plants table with specified userId
      return db.Plants.findAll({
        where: {idOfUser: userId}
      })
      .then(function(plantsResult) {
        if(plantsResult) {
          throw ERROR('Plants do not exists');
        }
        console.log('Plants associated with this user ', plantResult);
      })
      .catch(function(error) {
        console.log('Error, retrieving plantsResult: ', error);
      })
    })
  },

  //garden is an object with gardenName
  getGardenPlants : function(garden) {
    var gardenId;
    //Check for gardenName in Gardens table
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden does not exist');
      }
      console.log('Garden associated with this plant: ', gardenResult);
      gardenId = gardenResult.id;
      //Check for idOfGarden in Plants table
      return db.Plants.findAll({
        where: {idOfGarden: gardenId}
      })
      .then(function(plantsResult) {
        if(!plantsResult) {
          throw ERROR('Plants do not exists');
        }
        console.log('Plants associated with this garden ', plantsResult);
      })
      .catch(function(error) {
        console.log('Error, retrieving plantsResult: ', error);
      })
    })
  }

  //garden is an object with username
  // getAllGardenFromUser : function(garden) { // TODO: Needs to be completed(Robert)
  //   var data = {};
  //   return db.Users.findOne({
  //     where: {username: garden.username}
  //   })
  //   .then(function(userResult) {
  //     if(!userResult) {
  //       throw Error('User does not exist');
  //     }
  //     console.log('UserId associated with this username: ', userResult.id);
  //     data.userId = userResult.id;
  //     //Check for plants where userId exists and Garden is not null in Plants table
  //     return db.Plants.findAll({
  //       where: {idOfUser: data.userId,
  //               idOfGarden: {$not: null,}}
  //     })
  //     .then(function(plantResults) {
  //       if(!plantResults) {
  //         throw ERROR('No gardens exist for user')
  //       }
  //       console.log('GardenId associated with user: ', plantResults);
  //       return db.Gardensfind({ 
  //       })
  //       .then(function(gardenResults) {
  //       if(!plantResults) {
  //         throw ERROR('No gardens exist for user')
  //       }
  //       console.log('Gardens associated with user: ', gardenResults);
  //     })
  //     .catch(function(error) {
  //       console.log('Error, retrieving plantsResult: ', error);
  //     })
  //   })
  // }

};

// var userNameRob = {username: 'Robert'};

// helpers.getAllGardenFromUser(userNameRob);

  // // Use to add a new plant
  // var plant1 = {
  //   username: 'Robert',
  //   commonName: 'Sunflowers',
  //   gardenName: 'Flower Power',
  //   plantDate: '',
  //   nickname: 'Angelica',
  //   plantStatus: 'Nursery'
  // };
  // helpers.addPlant(plant1);

  // // Use to add a new user
  // var profile1 = {
  //   username: 'Robert',
  //   password: 'SWISS',
  //   email: 'robertstuartcardiff@gmail.com',
  //   location: '',
  //   userPic: 'http://facebookcraze.com/wp-content/uploads/2009/12/funny_profile_pic_for_facebook_rape.jpg',
  //   createdAt: '',
  //   updatedAt: ''
  // };
  // helpers.addUser(profile1);

module.exports = helpers;
