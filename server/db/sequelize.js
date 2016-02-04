var pg = require('pg');
var Sequelize = require('sequelize');

  // if(process.env.DEPLOYED){
  //   var sequelize = new Sequelize('postgres://gkepgcetryiagb:gumSmA8e4HAkRR8x0cJ_BwW2tH@ec2-54-197-241-24.compute-1.amazonaws.com:5432/dbq8oko6l5h6q7', {
  //     dialect: 'postgres',
  //     protocol: 'postgres',
  //     dialectOptions: {
  //       ssl: true
  //     }
  //   });
  // } else {
    // var config = require('../env/config.js');
    var sequelize = new Sequelize('test', null, null,{
      host: 'localhost',
      dialect: 'sqlite',
      storage: './db.sqlite'
    });
  // };


var models = {};

models.Users = sequelize.define('User', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  // location: {
  //   type: Sequelize.STRING
  // },
  userPic: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.STRING
  },
  updatedAt: {
    type: Sequelize.STRING
  }
});

models.Plants = sequelize.define('Plant', {
  idOfUser:{
    type: Sequelize.INTEGER
  },
  idOfSpecies:{
    type: Sequelize.INTEGER
  },
  plantDate:{
    type: Sequelize.INTEGER
  },
  nickname: {
    type: Sequelize.STRING
  },
  plantStatus: {
    type: Sequelize.STRING
  },
  idOfGarden: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.STRING
  },
  updatedAt: {
    type: Sequelize.STRING
  }
});

models.SpeciesInfos = sequelize.define('SpeciesInfo', {
  commonName: {
    type: Sequelize.STRING
  },
  botanicalName: {
    type: Sequelize.STRING
  },
  plantPic: {
    type: Sequelize.STRING
  },
  plantLink: {
    type: Sequelize.STRING
  },
  wateringInformation: {
    type: Sequelize.STRING
  },
  typeOf: {
    type: Sequelize.STRING
  },
  exposure: {
    type: Sequelize.STRING
  },
  generalInformation: {
    type: Sequelize.TEXT
  },
  plantingGuide: {
    type: Sequelize.TEXT
  },
  pestsDiseases: {
    type: Sequelize.TEXT
  },
  careGuide: {
    type: Sequelize.TEXT
  }/*,
  createdAt: {
    type: Sequelize.STRING
  },
  updatedAt: {
    type: Sequelize.STRING
  }*/
});

models.Gardens = sequelize.define('Garden', {
  gardenName: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.STRING
  },
  updatedAt: {
    type: Sequelize.STRING
  }
});

models.Events = sequelize.define('Event', {
   idOfUser: {
     type: Sequelize.INTEGER
   },
   idOfPlant: {
     type: Sequelize.INTEGER
   },
   eventDate: {
     type: Sequelize.STRING
   },
   createdAt: {
     type: Sequelize.STRING
   },
   updatedAt: {
     type: Sequelize.STRING
   }
 });

models.UsersGardens = sequelize.define('UsersGarden', {
  userId: {
    type: Sequelize.INTEGER
  },
  gardenId: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.STRING
  },
  updatedAt: {
    type: Sequelize.STRING
  }
});

// establish the relationships between the tables
models.Users.hasMany(models.Events);
models.Plants.hasMany(models.Events);
models.Users.hasMany(models.Plants);
models.Gardens.hasMany(models.Plants);
models.SpeciesInfos.hasMany(models.Plants);
models.Users.belongsToMany(models.Gardens, {through: 'Plants'});
models.Gardens.belongsToMany(models.Users, {through: 'Plants'});
models.Users.hasMany(models.Gardens);
models.Gardens.hasMany(models.Users);
models.Users.belongsToMany(models.Gardens, {through: 'UsersGardens'});
models.Gardens.belongsToMany(models.Users, {through: 'UsersGardens'});

// {force: true} will drop the table and re-create it
models.Users.sync({
    force: false
  })
  .then(function() {
    console.log('User sync in sequelize.js');
    models.Plants.sync({
        force: false
      })
      .then(function() {
        console.log('Plant sync in sequelize.js');
        models.SpeciesInfos.sync({
            force: false
          })
          .then(function() {
            console.log('SpeciesInfo sync in sequelize.js');
            models.Gardens.sync({
                force: false
              })
              .then(function() {
                console.log('Garden sync in sequelize.js');
                models.UsersGardens.sync({
                    force: false
                  })
                  .then(function() {
                    console.log('UsersGardens sync in sequelize.js');
                    models.Events.sync({force: false})
                     .then(function() {
                       console.log('Event sync in sequelize.js');
                      });
                  });
              });
          });
      });
  });






module.exports = models;
