import { Router } from 'express';
import wineService from '../services/catalogService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';

import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const catalogController = Router();

catalogController.get('/', async (req, res) => {
    const wines = await wineService.getAll();
    res.cookie(AUTH_COOKIE_NAME, wines, { httpOnly: true }); //work here with cookies
    res.send(wines);
    
});

catalogController.get('/create', (req, res) => { // isAuth
    res.send(' get method /create works');
    
});

catalogController.post('/create', async (req, res) => { // isAuth
    const wineData = req.body;
    /* const wineData = {
        name: "Terres Mavrud 2010",
        type: "white",
        grapeVariety: "Mavrud",
        vintage: 2010,
        wineCellar: "Wine Cellar Todoroff",
        regionCountry: "Bulgaria",
        price: 85.00,
        description: "Fine dry red aged wine",
        image: "https://www.sid-shop.com/media/catalog/product/cache/5a44058c21b07e4f9b1b259091147119/t/o/todoroff-teres-mavrud-2016-image_5f00ff88b682b_1280x1280.jpeg"
    } */
    
    //const userId = req.user._id;
    const userId = '6748c9320b832d410f5852cf';
    //res.send(`post method /catalog/create works with userId: ${userId}`);

    try {
        const result = await wineService.create(wineData, userId);
        res.cookie(AUTH_COOKIE_NAME, result, { httpOnly: true }); //work here with cookies
        console.log(result);
        res.json(result);
        
    } catch (err) {
        const error = getErrorMessage(err);
        res.send(error);
        
    }
});

catalogController.get('/search', async (req, res) => {
    const query = req.query;
    const wines = await wineService.getAll(query).lean();
    
});

catalogController.get('/:wineId/details', async (req, res) => {

    const wine = await wineService.getOne(req.params.wineId).lean();
    
    //const isOwner = wine.owner.toString() == req.user?._id;
    //const isVoted = wine.likedList?.some(userId => userId == req.user?._id);
    res.send(wine);
    
    
});

catalogController.get('/:wineId/vote', async (req, res) => {
    const wineId = req.params.wineId;
    //const userId = req.user._id;
    const userId = "6748c9320b832d410f5852cf";
    try {
        await wineService.vote(wineId, userId);
        console.log("work");
        res.send(wineId);
    } catch (err) {
        const error = getErrorMessage(err);
        console.log(error);   
        //res.send(error);  
        return error;   
    }
});

catalogController.get('/:wineId/delete', async (req, res) => {
    try {
        await wineService.remove(req.params.wineId);
       //await wineService.remove();
    } catch (error) {
        console.log(error);
        //res.send(error);
        return error;
    }
});

catalogController.get('/:wineId/edit', async (req, res) => {
    const wine  = await wineService.getOne(req.params.wineId).lean();
    res.send(wine);    
});

catalogController.post('/:wineId/edit', async (req, res) => {
    const wineData = req.body;
    const wineId = req.params.wineId;
    
try {
    await wineService.edit(wineId, wineData);
    
} catch (err) {
    const error = getErrorMessage(err);
    res.send(error);
}
});

export default catalogController;