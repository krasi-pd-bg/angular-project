import express from 'express';
import cookieParser from 'cookie-parser';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import  cors  from 'cors';


export default function configExpress(app) {
    
    //app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
   /*app.use(cors({
        origin: config.origin,
        credentials: true
      }));*/
    app.use(cookieParser());
    app.use(authMiddleware);
    

    
};