const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shelter_history', {
    shelter_residence_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'animals',
        key: 'animal_id'
      }
    },
    shelter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shelters',
        key: 'shelter_id'
      }
    },
    arrival_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'shelter_history',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "shelter_residence_id" },
        ]
      },
      {
        name: "animal_id",
        using: "BTREE",
        fields: [
          { name: "animal_id" },
        ]
      },
      {
        name: "shelter_id",
        using: "BTREE",
        fields: [
          { name: "shelter_id" },
        ]
      },
    ]
  });
};
