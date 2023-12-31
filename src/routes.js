import express from 'express';
const routes = express.Router();

import createAnOrder from "./middlewares/createAnOrder.js";
import updateOrder from "./middlewares/updateOrder.js";
import updateOrderDelivery from "./middlewares/updateOrderDelivery.js";
import deleteAnOrder from "./middlewares/deleteAnOrder.js";
import showASpecificOrder from "./middlewares/showASpecificOrder.js";
import spendingForAParticularCustomer from "./middlewares/spendingForAParticularCustomer.js";
import totalAmountEarnedByAProduct from "./middlewares/totalAmountEarnedByAProduct.js";
import topSellingProducts from "./middlewares/topSellingProducts.js";


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
        console.error('Error in /atualizarpedido/:idOrder route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

routes.patch("/atualizarentrega/:idOrder", async (req, res)=>{
    try {
        const idOrder = parseInt (req.params.idOrder);
        const bodyParams = req.body;

        if(isNaN(idOrder)){
            return res.status(400).json('O parâmetro deve ser um número inteiro válido.');
        }

        if (Object.keys(bodyParams).length === 0){
            return res.status(400).send('O corpo da requisição deve conter uma atualização do campo "entregue". Ex: {"entregue": true}.');
        }

        const result = await updateOrderDelivery(idOrder, bodyParams);

        if (result === "O pedido informado não existe.") {
            return res.status(400).json(result);
        }

        res.send(result);
    } catch (err) {
        console.error('Error in /atualizarentrega/:idOrder route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

routes.delete("/deletarpedido/:idOrder", async(req, res)=>{
    try{
        const idOrder = parseInt (req.params.idOrder);

        if(isNaN(idOrder)){return res.status(400).json('O parâmetro deve ser um número inteiro válido.');}

        const result = await deleteAnOrder(idOrder);
        
        if(result === "O pedido informado não existe."){return res.status(400).json(result);}
        if(result === 'Pedido deletado com sucesso.'){return res.json(result);}
    }catch(err){
        console.error('Error in /deletarpedido/:idOrder route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

routes.get("/obterpedido/:idOrder", async(req, res)=>{
    try {
        const idOrder = parseInt (req.params.idOrder);
        
        if(isNaN(idOrder)){return res.status(400).json('O parâmetro deve ser um número inteiro válido.');}
        
        const result = await showASpecificOrder(idOrder);
        
        if(result === "O pedido informado não existe."){return res.status(400).json(result);}
    
        res.send(result);
    } catch (err){
        console.error('Error in /obterpedido/:idOrder route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

routes.get("/gastosdeumcliente", async(req, res)=>{
    try {
        const bodyParams = req.body;

        if (Object.keys(bodyParams).length === 0){
            return res.status(400).send('O corpo da requisição deve conter uma chave e valor relacionada ao cliente. Ex: {"cliente": "fulano"}.');
        }

        const result = await spendingForAParticularCustomer(bodyParams);

        res.json(result);
    } catch (err){
        console.error('Error in /gastosdeumcliente route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

routes.get("/ganhosdeumproduto", async(req, res)=>{
    try {
        const bodyParams = req.body;

        if (Object.keys(bodyParams).length === 0){
            return res.status(400).send('O corpo da requisição deve conter uma chave e valor relacionada ao cliente. Ex: {"produto": "Pizza"}.');
        }

        const result = await totalAmountEarnedByAProduct(bodyParams);

        res.json(result);
    } catch (err){
        console.error('Error in /ganhosdeumproduto route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

routes.get("/produtosmaisvendidos", async(req, res)=>{
    try {
        const result = await topSellingProducts();
        res.json(result);
    } catch (err){
        console.error('Error in /produtosmaisvendidos route:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});


export default routes;
