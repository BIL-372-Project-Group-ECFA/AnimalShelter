const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('animals', {
    animal_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    species: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('Male','Female'),
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    neutered: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true, // Fotoğraf zorunlu değil
    }    
  }, {
    sequelize,
    tableName: 'animals',
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
    ]
  });
};
