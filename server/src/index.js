import express from 'express';
import 'dotenv/config';

import routes from './routes.js';
import configExpress from './config/configExpress.js';
import configDatabase from './config/configDatabase.js';

const app = express();

configDatabase();
configExpress(app);

//app.use(routes);    
app.use('/api', routes); //localhost:3000/api

app.listen(3000, () => console.log('Server is listening on http://localhost:3000'));