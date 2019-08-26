import { Pool } from 'pg';
import "@babel/polyfill";
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DEFAULT_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
})

const databaseConnectionHandler = {
    testConnection() {
    }
}

export default databaseConnectionHandler;