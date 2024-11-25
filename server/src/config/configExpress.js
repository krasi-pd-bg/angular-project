import express from 'express';
import cookieParser from 'cookie-parser';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import  cors  from 'cors';


export default function configExpress(app) {
    
    //app.use(express.static('public'));
    app.use("/static", express.static("src/public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(authMiddleware);
    app.use(express.json());
    app.use(cors());

    
};