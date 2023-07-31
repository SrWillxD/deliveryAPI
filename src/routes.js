import express from 'express';
const routes = express.Router();

import createAnOrder from "./middlewares/createAnOrder.js";


routes.post("/criarpedido", async(req, res)=>{
    try {
        const bodyParams = req.body;
        const result = await createAnOrder(bodyParams);
        res.send(result);
    }catch (err) {
        console.error('Error in /criarpedido route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
})



export default routes;