const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medical_records', {
    record_id: {
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
    check_up_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    veterinarian_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'veterinarians',
        key: 'veterinarian_id'
      }
    },
    next_check_up_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'medical_records',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "record_id" },
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
        name: "veterinarian_id",
        using: "BTREE",
        fields: [
          { name: "veterinarian_id" },
        ]
      },
    ]
  });
};
