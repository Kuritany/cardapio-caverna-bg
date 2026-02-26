import { OrderData } from "../types/ItemData";

class OrdersService {
  async postOrder(OrderData: OrderData) {
    const url = "https://script.google.com/macros/s/AKfycby5CCfXxWIEGhbboZeLkXLo1YUUB1gQrK2IGHw_Vs7DLTMhLtQ1rHidBJtI6PWH84rj/exec"
    return await fetch(
      url,
      {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: `data=${JSON.stringify(OrderData)}`
      }
    ).then(response => {
      console.log('Response from server:', response);
      return response.ok;
    }).catch(error => {
      console.error('Error occurred during CORS request:', error);
      throw Error("Occoreu um erro ao realizar seu pedido, entre em contato com a administração.");
    });
    
  }
}

export default new OrdersService();

/*

fetch(
      url,
      {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: (`Nome=${e.target.nome.value}` +
              `&Telefone=${e.target.telefone.value}` +
              `&Unidade=${e.target.unidade.value}` +
              `&Mesa=${e.target.mesa.value}` +
              `&Itens=${e.target.item.value}` +
              `&Valor=${e.target.valor.value}`)
      }

*/

