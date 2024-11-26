const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('veterinarians', {
    veterinarian_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contact_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    license_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "license_number"
    },
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'veterinarians',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "veterinarian_id" },
        ]
      },
      {
        name: "license_number",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "license_number" },
        ]
      },
    ]
  });
};
