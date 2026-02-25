type ItemData = {
    categoria: string;
    item: string;
    preco: number;
}

export type OrderItemData = {
    itemData: ItemData;
    amount: number;
}

export type OrderData = {
  nome: string;
  telefone: string;
  unidade: string;
  mesa: string;
  orderItems: object;
  observacao: string;
}

export default ItemData;