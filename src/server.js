const express = require('express');
import '@babel/polyfill';
const bodyParser =  require('body-parser');

import logger from './Utils/logger';
import routes from './Routes/routes';
import path from 'path';
import databaseConnectionHandler from './DB/databaseConnectionHandler';

const staticPath = path.join(__dirname, 'dist')

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

routes(app);

databaseConnectionHandler.testConnection();

app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
})
