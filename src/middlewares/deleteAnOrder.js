import captureJSON from "./capture.js";
import writeJSON from "./writeJSON.js"

async function deleteAnOrder(idOrder){
    const filePath = "./pedidos.json";
    const jsonData = await captureJSON(filePath);

    const orderIndex = jsonData.pedidos.findIndex(order=> order.id === idOrder);

    if (orderIndex === -1) {
        return 'O pedido informado não existe.';
    }

    jsonData.pedidos.splice(orderIndex, 1);

    writeJSON(filePath, jsonData);

    return 'Pedido deletado com sucesso.';
}

export default deleteAnOrder;
