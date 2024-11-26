const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vaccination_details', {
    vaccination_id: {
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
    vaccination_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vaccines',
        key: 'vaccine_id'
      }
    },
    vaccination_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vaccination_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vaccination_id" },
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
        name: "vaccination_type_id",
        using: "BTREE",
        fields: [
          { name: "vaccination_type_id" },
        ]
      },
    ]
  });
};
