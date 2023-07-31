import captureJSON from "./capture.js";
import writeJSON from "./writeJSON.js"

async function createAnOrder(bodyParams){
    const filePath = "./pedidos.json";
    const jsonData = await captureJSON(filePath);

    const newOrder = {
      "id": jsonData.nextId, 
      "cliente": bodyParams.cliente,
      "produto": bodyParams.produto,
      "valor": bodyParams.valor,
      "entregue": false,
      "timestamp": new Date().toISOString()
    }

    jsonData.nextId++;
    jsonData.pedidos.push(newOrder);

    writeJSON(filePath, jsonData)

    return newOrder;
}

export default createAnOrder;
