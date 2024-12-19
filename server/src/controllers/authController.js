import { response, Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const authController = Router();

authController.get('/register', (req, res) => {
        
});

authController.post('/register', async (req, res) => {
    // get input
    const { username, email, password, rePassword } = req.body;
    
    // check rePassword in authService
    //call authService register function
    try {
        const user = await authService.register(username, email, password, rePassword);
        res.cookie(AUTH_COOKIE_NAME, user.accessToken, { httpOnly: true });        
        res.send(user);
        //res.json(token);
    } catch (err) {
        // add error message
        const error = getErrorMessage(err);
        res.status(409)
        res.send({message: error});
        return;
    }
});

authController.get('/profile',  async (req, res) => {
    const userId = req.user?._id;
    try {
        const user = await authService.getCurrentUser(userId);
        res.cookie(AUTH_COOKIE_NAME, user.accessToken, { httpOnly: true });
        res.send(user);
    } catch (err) {
        const error = getErrorMessage(err);
        res.status(401)
        .send(error);
    }    
});

authController.get('/user/:id', async (req, res) => {
try {
    const id = req.params.id;
    const user = await authService.getUser(id);
    res.status(200)
    .send(user);
} catch (error) {
    res.status(404).send({error});
}
});

authController.post('/login', async (req, res) => {
    // get login data
    const { username, password } = req.body;   
    
    try {
        // use auth service login
        const user = await authService.login(username, password);        
        // add token to cookie
        res.cookie(AUTH_COOKIE_NAME, user.accessToken, { httpOnly: true });        
        res.send(user);
        //res.json(user);
        
        
    } catch (err) {
        // TODO: send error message
        const error = getErrorMessage(err);
        res.status(401)
        .send(error);
        
    }
});

authController.post('/logout', (req, res) => {
    console.log('logout');
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(204)
    .send({ message: 'Logged out' });
    
});
authController.get('/logout', (req, res) => {
    console.log('logout');
    
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(204)
    .send({ message: 'Logged out' });
});


export default authController;