import captureJSON from "./capture.js";

async function totalAmountEarnedByAProduct(bodyParams){
    const filePath = "./pedidos.json";
    const jsonData = await captureJSON(filePath);

    let spendValue = 0;

    jsonData.pedidos.forEach(element => {
        if(element.produto === bodyParams.produto && element.entregue === true){
            spendValue+=element.valor;
        }
    });


    if(spendValue === 0){
        return "Produto não encontrado.";
    }
    
    return spendValue;
}

export default totalAmountEarnedByAProduct;
