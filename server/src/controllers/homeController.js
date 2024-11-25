import { Router } from 'express';

const homeController = Router();

homeController.get('/',  (req, res) => {
    res.send('Welcome');
});
// TODO: only for test, remove next time
homeController.get('/authorized', (req, res) => {
    res.send("Welcome!!!");    
});


export default homeController;
