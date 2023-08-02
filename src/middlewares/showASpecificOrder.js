import captureJSON from "./capture.js";
import writeJSON from "./writeJSON.js"

async function showASpecificOrder(idOrder){
    const filePath = "./pedidos.json";
    const jsonData = await captureJSON(filePath);

    const orderToBeShowed = {};

    jsonData.pedidos.forEach(element => {
        if(element.id === idOrder){
            orderToBeShowed.order = element;
        }
    });

    if (Object.keys(orderToBeShowed).length === 0) {
        return "O pedido informado não existe.";
    }

    return orderToBeShowed;
}

export default showASpecificOrder;