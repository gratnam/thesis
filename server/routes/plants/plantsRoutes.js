var plantsHandler = require('./plantsHandler.js');

module.exports = function(app) {
 app.post('/addPlants', plantsHandler.addPlants);
 app.post('/addGarden', plantsHandler.addGarden);
 app.get('/loadPlants', plantsHandler.getPlantsForAUser);
 app.post('/loadSpecieInfo', plantsHandler.getSpecieInfo);
 app.post('/loadPlantInfo', plantsHandler.getPlant);
 app.post('/loadUserGardens', plantsHandler.getUserGardens);
 app.post('/loadGardenPlants', plantsHandler.getGardenPlants);
};
