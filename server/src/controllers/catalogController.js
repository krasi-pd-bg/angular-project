import { Router } from 'express';
import wineService from '../services/catalogService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';

import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const catalogController = Router();

catalogController.get('/', async (req, res) => {
    const wines = await wineService.getAll();
    res.send(wines);
    
});

catalogController.get('/create', (req, res) => { // isAuth
    res.send(' get method /create works');
    
});

catalogController.post('/create', async (req, res) => { // isAuth
    const wineData = req.body;
    const userId = req.user._id;

    try {
        const result = await wineService.create(wineData, userId);
        res.json(result);
        
    } catch (err) {
        const error = getErrorMessage(err);
        res.send(error);
        
    }
});

catalogController.post('/search', async (req, res) => {
    //const query = req.query;
    const query = req.body;
    console.log(req.body);
    
    try {
        const wines = await wineService.getAll(query).lean();
        res.send(wines);
    } catch (error) {
        return error;
    }
    
});

catalogController.get('/:wineId/details', async (req, res) => {

    const wine = await wineService.getOne(req.params.wineId).lean();
    
    //const isOwner = wine.owner.toString() == req.user?._id;
    //const isVoted = wine.likedList?.some(userId => userId == req.user?._id);
    res.send(wine);
    
    
});

catalogController.get('/:wineId/vote', async (req, res) => {
    const wineId = req.params.wineId;
    const userId = req.user._id;
    
    try {
        await wineService.vote(wineId, userId);
        console.log("work");
        res.send({});
    } catch (err) {
        const error = getErrorMessage(err); 
        res.send(error);  
        return error;   
    }
});

catalogController.delete('/:wineId/delete', async (req, res) => {
    try {
        await wineService.remove(req.params.wineId);
       //await wineService.remove();
       res.send({});
    } catch (error) {
        res.send(error);
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
    const editedWine = await wineService.edit(wineId, wineData);
    res.send(editedWine);
    
} catch (err) {
    const error = getErrorMessage(err);
    res.send(error);
}
});

export default catalogController;