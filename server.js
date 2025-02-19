const express = require('express');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const { sequelize } = require('./models'); // Import Sequelize models
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());

// Logger setup
const logDir = path.join(__dirname, 'logs');
const logFilePath = path.join(logDir, 'app.log');

// Create logs folder if it doesn't exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
    level: 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: logFilePath }),
        new winston.transports.Console({ format: winston.format.simple() }) // Log to console as well
    ]
});

// Middleware to log incoming requests
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    next();
});

// Routes
app.use('/api/user', userRoutes);

// Error handling middleware for logging errors
app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message} - Stack: ${err.stack}`);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Connect to the database and start the server
sequelize.sync()
    .then(() => {
        logger.info('Database connected successfully');
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error('Unable to connect to the database:', err);
    });