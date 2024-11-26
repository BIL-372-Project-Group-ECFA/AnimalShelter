const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adoption_history', {
    adoption_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shelter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shelters',
        key: 'shelter_id'
      }
    },
    adopter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    adoption_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'animals',
        key: 'animal_id'
      }
    }
  }, {
    sequelize,
    tableName: 'adoption_history',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "adoption_id" },
        ]
      },
      {
        name: "shelter_id",
        using: "BTREE",
        fields: [
          { name: "shelter_id" },
        ]
      },
      {
        name: "adopter_id",
        using: "BTREE",
        fields: [
          { name: "adopter_id" },
        ]
      },
      {
        name: "animal_id",
        using: "BTREE",
        fields: [
          { name: "animal_id" },
        ]
      },
    ]
  });
};
