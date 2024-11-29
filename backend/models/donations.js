const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donations', {
    donation_id: {
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
    donor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    donation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'donations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "donation_id" },
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
        name: "donor_id",
        using: "BTREE",
        fields: [
          { name: "donor_id" },
        ]
      },
    ]
  });
};
