const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vaccines', {
    vaccine_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vaccine_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    validity_period: { // Yeni sütun
      type: DataTypes.INTEGER,
      allowNull: false, // Her aşının geçerlilik süresi olmalı
      defaultValue: 12, // Varsayılan değer (12 ay)
      comment: "Aşının geçerlilik süresi ay cinsinden tutulur"
    }
  }, {
    sequelize,
    tableName: 'vaccines',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vaccine_id" },
        ]
      },
    ]
  });
};
