import captureJSON from "./capture.js";

async function topSellingProducts() {
    const filePath = "./pedidos.json";
    const jsonData = await captureJSON(filePath);

    const produtosVendidos = {};

    jsonData.pedidos.forEach(pedido => {
        if (pedido.entregue) {
            const produto = pedido.produto;
            produtosVendidos[produto] = (produtosVendidos[produto] || 0) + 1;
        }
    });

    const produtosOrdenados = Object.keys(produtosVendidos)
        .sort((a, b) => produtosVendidos[b] - produtosVendidos[a])
        .map(produto => `${produto} - ${produtosVendidos[produto]}`);

    return produtosOrdenados;
}

export default topSellingProducts;