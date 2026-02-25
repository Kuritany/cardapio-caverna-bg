import { OrderData } from "../types/ItemData";

class OrdersService {
  async postOrder(OrderData: OrderData) {
    return await fetch(
      process.env.NEXT_PUBLIC_ORDER_API_URL!,
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
      return false;
    });
    
  }
}

export default new OrdersService();



  /*
AKfycbz_5i5Djv3bIaTtWei9sQTHIc8-zfhhyZmdiXs79OMZ2i8Ncba0Kv7jfpdK9vCWU9h0

https://script.google.com/macros/s/AKfycbz_5i5Djv3bIaTtWei9sQTHIc8-zfhhyZmdiXs79OMZ2i8Ncba0Kv7jfpdK9vCWU9h0/exec

Nome	Telefone	Unidade	Mesa	Item	Valor	DataHora	Cancelado	Pago

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

