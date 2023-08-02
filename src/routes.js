import express from 'express';
const routes = express.Router();

import createAnOrder from "./middlewares/createAnOrder.js";
import updateOrder from "./middlewares/updateOrder.js"


routes.post("/criarpedido", async(req, res)=>{
    try {
        const bodyParams = req.body;
        const result = await createAnOrder(bodyParams);
        res.send(result);
    }catch (err) {
        console.error('Error in /criarpedido route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

routes.put("/atualizarpedido/:idOrder", async(req, res)=>{
    try {
        const idOrder = parseInt (req.params.idOrder);
        const bodyParams = req.body;

        if (isNaN(idOrder)){
            return res.status(400).json('O parâmetro deve ser um número inteiro válido.');
        }

        const result = await updateOrder(idOrder, bodyParams);

        if (result === "O pedido informado não existe.") {
            return res.status(400).json(result);
        }

        res.send(result);
    } catch(err){
        console.error('Error in /atualizarpedido route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});



export default routes;
