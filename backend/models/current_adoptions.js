const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('current_adoptions', {
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'animals',
        key: 'animal_id'
      }
    },
    adoption_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'adoption_history',
        key: 'adoption_id'
      }
    }
  }, {
    sequelize,
    tableName: 'current_adoptions',
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
        name: "adoption_id",
        using: "BTREE",
        fields: [
          { name: "adoption_id" },
        ]
      },
    ]
  });
};
