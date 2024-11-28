var DataTypes = require("sequelize").DataTypes;
var _adoption_history = require("./adoption_history");
var _animals = require("./animals");
var _current_adoptions = require("./current_adoptions");
var _current_shelter_residences = require("./current_shelter_residences");
var _donations = require("./donations");
var _medical_records = require("./medical_records");
var _shelter_history = require("./shelter_history");
var _shelters = require("./shelters");
var _users = require("./users");
var _vaccination_details = require("./vaccination_details");
var _vaccines = require("./vaccines");
var _veterinarians = require("./veterinarians");

function initModels(sequelize) {
  var adoption_history = _adoption_history(sequelize, DataTypes);
  var animals = _animals(sequelize, DataTypes);
  var current_adoptions = _current_adoptions(sequelize, DataTypes);
  var current_shelter_residences = _current_shelter_residences(sequelize, DataTypes);
  var donations = _donations(sequelize, DataTypes);
  var medical_records = _medical_records(sequelize, DataTypes);
  var shelter_history = _shelter_history(sequelize, DataTypes);
  var shelters = _shelters(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vaccination_details = _vaccination_details(sequelize, DataTypes);
  var vaccines = _vaccines(sequelize, DataTypes);
  var veterinarians = _veterinarians(sequelize, DataTypes);

  current_adoptions.belongsTo(adoption_history, { as: "adoption", foreignKey: "adoption_id"});
  adoption_history.hasMany(current_adoptions, { as: "current_adoptions", foreignKey: "adoption_id"});
  adoption_history.belongsTo(animals, { as: "animal", foreignKey: "animal_id"});
  animals.hasMany(adoption_history, { as: "adoption_histories", foreignKey: "animal_id"});
  current_adoptions.belongsTo(animals, { as: "animal", foreignKey: "animal_id"});
  animals.hasOne(current_adoptions, { as: "current_adoption", foreignKey: "animal_id"});
  current_shelter_residences.belongsTo(animals, { as: "animal", foreignKey: "animal_id"});
  animals.hasOne(current_shelter_residences, { as: "current_shelter_residence", foreignKey: "animal_id"});
  medical_records.belongsTo(animals, { as: "animal", foreignKey: "animal_id"});
  animals.hasMany(medical_records, { as: "medical_records", foreignKey: "animal_id"});
  shelter_history.belongsTo(animals, { as: "animal", foreignKey: "animal_id"});
  animals.hasMany(shelter_history, { as: "shelter_histories", foreignKey: "animal_id"});
  vaccination_details.belongsTo(animals, { as: "animal", foreignKey: "animal_id"});
  animals.hasMany(vaccination_details, { as: "vaccination_details", foreignKey: "animal_id"});
  current_shelter_residences.belongsTo(shelter_history, { as: "shelter_residence", foreignKey: "shelter_residence_id"});
  shelter_history.hasMany(current_shelter_residences, { as: "current_shelter_residences", foreignKey: "shelter_residence_id"});
  adoption_history.belongsTo(shelters, { as: "shelter", foreignKey: "shelter_id"});
  shelters.hasMany(adoption_history, { as: "adoption_histories", foreignKey: "shelter_id"});
  donations.belongsTo(shelters, { as: "shelter", foreignKey: "shelter_id"});
  shelters.hasMany(donations, { as: "donations", foreignKey: "shelter_id"});
  shelter_history.belongsTo(shelters, { as: "shelter", foreignKey: "shelter_id"});
  shelters.hasMany(shelter_history, { as: "shelter_histories", foreignKey: "shelter_id"});
  adoption_history.belongsTo(users, { as: "adopter", foreignKey: "adopter_id"});
  users.hasMany(adoption_history, { as: "adoption_histories", foreignKey: "adopter_id"});
  donations.belongsTo(users, { as: "donor", foreignKey: "donor_id"});
  users.hasMany(donations, { as: "donations", foreignKey: "donor_id"});
  vaccination_details.belongsTo(vaccines, { as: "vaccination_type", foreignKey: "vaccination_type_id"});
  vaccines.hasMany(vaccination_details, { as: "vaccination_details", foreignKey: "vaccination_type_id"});
  medical_records.belongsTo(veterinarians, { as: "veterinarian", foreignKey: "veterinarian_id"});
  veterinarians.hasMany(medical_records, { as: "medical_records", foreignKey: "veterinarian_id"});

  return {
    adoption_history,
    animals,
    current_adoptions,
    current_shelter_residences,
    donations,
    medical_records,
    shelter_history,
    shelters,
    users,
    vaccination_details,
    vaccines,
    veterinarians,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
