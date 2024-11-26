const Sequelize = require('sequelize');
const initModels = require('../models/init-models');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_ENDPOINT, 
    dialect: 'mysql', 
    logging: false,
});

async function connectToTheDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database successfully.');
    } catch(error) {
        console.error('Failed to connect to the database: ' + error);
        throw error;
    }
};

async function initializeDatabase() {
    try {
        await connectToTheDatabase();
    
        initModels(sequelize);
    
        await sequelize.sync();
        console.log('Tablolar başarıyla senkronize edildi!');
    
    } catch (error) {
        console.error('Veritabanı başlatma sırasında hata oluştu:', error);
        throw error;
    }
};

module.exports = { initializeDatabase };