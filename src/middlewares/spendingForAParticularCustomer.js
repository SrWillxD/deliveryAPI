import captureJSON from "./capture.js";

async function spendingForAParticularCustomer(bodyParams){
    const filePath = "./pedidos.json";
    const jsonData = await captureJSON(filePath);

    let spendValue = 0;

    jsonData.pedidos.forEach(element => {
        if(element.cliente === bodyParams.cliente && element.entregue === true){
            spendValue+=element.valor;
        }
    });


    if(spendValue === 0){
        return "Este cliente não consumiu nada.";
    }
    
    return spendValue;
}

export default spendingForAParticularCustomer;
