const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('current_shelter_residences', {
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'animals',
        key: 'animal_id'
      }
    },
    shelter_residence_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shelter_history',
        key: 'shelter_residence_id'
      }
    }
  }, {
    sequelize,
    tableName: 'current_shelter_residences',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "animal_id" },
        ]
      },
      {
        name: "shelter_residence_id",
        using: "BTREE",
        fields: [
          { name: "shelter_residence_id" },
        ]
      },
    ]
  });
};
