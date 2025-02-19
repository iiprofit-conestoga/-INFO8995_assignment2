const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create the logger
const logger = createLogger({
  level: 'info', // Log all messages of 'info' level and below (error, warn, etc.)
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(), // Logs to console
    new transports.File({ filename: path.join(logDir, 'app.log') }), // General logs
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }) // Error logs only
  ],
});

module.exports = logger;