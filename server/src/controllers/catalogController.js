import { Router } from 'express';
import wineService from '../services/catalogService.js';

import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const catalogController = Router();

catalogController.get('/', async (req, res) => {
    const wines = await wineService.getAll();
    res.send(wines);
    
});

catalogController.get('/create', isAuth, (req, res) => {
    res.send('catalog create');
    
    
});

catalogController.post('/create', isAuth, async (req, res) => {
    const wineData = req.body;
    /*const wineData = {
        name: "Terres Mavrud 2010",
        type: "red",
        grapeVariety: "Mavrud",
        vintage: 2010,
        wineCellar: "Wine Cellar Todoroff",
        regionCountry: "Bulgaria",
        price: 85.00,
        description: "Fine dry red aged wine",
        image: "https://www.sid-shop.com/media/catalog/product/cache/5a44058c21b07e4f9b1b259091147119/t/o/todoroff-teres-mavrud-2016-image_5f00ff88b682b_1280x1280.jpeg"
    }*/
    const userId = req.user._id;
    

    try {
        await wineService.create(wineData, userId);
        res.send(userId);
        
    } catch (err) {
        const error = getErrorMessage(err);
        res.send(error);
    }
});

catalogController.get('/search', async (req, res) => {
    const query = req.query;
    const wines = await wineService.getAll(query).lean();
    res.send('search');
    res.status(200);
    res.end();
});

catalogController.get('/:wineId/details', async (req, res) => {

    const wine = await wineService.getOne(req.params.wineId).lean();
    
    const isOwner = wine.owner.toString() == req.user?._id;
    const isVoted = wine.likedList?.some(userId => userId == req.user?._id);
    res.send(wine);
    
    
});

catalogController.get('/:wineId/vote', async (req, res) => {
    const wineId = req.params.wineId;
    const userId = req.user._id;
    try {
        await wineService.vote(wineId, userId);
        
    } catch (err) {
        const error = getErrorMessage(err);
        console.log(error);   
        res.send(error);     
    }
});

catalogController.get('/:wineId/delete', async (req, res) => {
    try {
        await wineService.remove(req.params.wineId);
       
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

catalogController.get('/:wineId/edit', async (req, res) => {
    const wine  = await wineService.getOne(req.params.wineId).lean();

    
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