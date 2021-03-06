import express from 'express';
import '@babel/polyfill';
const bodyParser =  require('body-parser');
import cors from 'cors';

import logger from './Utils/logger';
import routes from './Routes/routes';
import path from 'path';
import databaseConnectionHandler from './DB/databaseConnectionHandler';

const staticPath = path.join(__dirname, '/build')

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static(staticPath));
routes(app);

databaseConnectionHandler.testConnection();

app.listen(port, () => {
    console.log(`Serving static files from ${staticPath}`);
    logger.info(`Listening on port ${port}`);
})
