import captureJSON from "./capture.js";
import writeJSON from "./writeJSON.js"

async function updateOrderDelivery(idOrder, bodyParams){
    const filePath = "./pedidos.json";
    const jsonData = await captureJSON(filePath);

    const orderToBeUpdated = {};

    jsonData.pedidos.forEach(element => {
        if(element.id === idOrder){
            orderToBeUpdated.index = element.id -1;
            orderToBeUpdated.objToBeUpdated = element;
        }
    });

    if (Object.keys(orderToBeUpdated).length === 0) {
        return "O pedido informado não existe.";
    }

    orderToBeUpdated.objToBeUpdated.entregue = bodyParams.entregue;

    jsonData.pedidos[orderToBeUpdated.index] = orderToBeUpdated.objToBeUpdated;

    writeJSON(filePath, jsonData);

    return orderToBeUpdated.objToBeUpdated;
}

export default updateOrderDelivery;