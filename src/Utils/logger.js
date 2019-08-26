require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp}) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'now!'}),
        timestamp(),
        customFormat
    ),
    transports: [
        new transports.Console({
            level: 'debug',
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: true
        }),
        new transports.File({
            prettyPrint: false,
            silent: false,
            colorize: true,
            timestamp: true,
            filename: 'debug.log',
            maxsize: 40000,
            maxFiles: 10,
            json: false
        })
    ]
});

export default logger;