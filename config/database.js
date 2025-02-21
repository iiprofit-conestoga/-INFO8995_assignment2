require('dotenv').config();  // To load .env file

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 3306,
  logging: console.log,  // Debugging purposes
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  retry: {
    max: 5,
    timeout: 3000
  },
  dialectOptions: {
    connectTimeout: 60000
  }
});

// More robust connection handling
const connectWithRetry = async () => {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return;
    } catch (err) {
      retries -= 1;
      console.log(`Failed to connect. Retries left: ${retries}`);
      if (retries === 0) {
        console.error('Unable to connect to the database:', err);
        throw err;
      }
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

connectWithRetry();

module.exports = sequelize;