import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.send('register works');
});

authController.post('/register', async (req, res) => {
    // get input
    const { username, email, password, rePassword } = req.body;
    
    // check rePassword in authService
    //call authService register function
    try {
        const token = await authService.register(username, email, password, rePassword);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        
        //res.send(token);
        res.json(token);
    } catch (err) {
        // add error message
        const error = getErrorMessage(err);
        res.json(error);
    }
});

authController.get('/login', (req, res) => {
    
    res.send('login works');
});

authController.post('/login', async (req, res) => {
    // get login data
    const { username, password } = req.body;
    console.log(username, password);
    /*const { email, password } = {
        email: "pesho@abv.bg",
        password: "123456",
    }*/
    
    try {
        // use auth service login
        const token = await authService.login(username, password);
        console.log(token);
        
        // add token to cookie
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        
        //res.send(token);
        res.json(token);
        
        
    } catch (err) {
        // TODO: send error message
        const error = getErrorMessage(err);
        res.send(error);
    }
});

authController.get('/logout', (req, res) => {
    console.log('logout');
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(204).end();
});


export default authController;