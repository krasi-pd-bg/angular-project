export const corsMiddleware = (req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', "https://localhost:4200")
    //res.setHeader('Access-Control-Allow-Credentials', true)
    //res.setHeader('Access-Control-Allow-Headers', "Content-Type, X-Authorization")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')   

    next();
};
