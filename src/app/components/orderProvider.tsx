'use client'
import { ActionDispatch, createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import ItemData, { OrderItemData } from "../types/ItemData";

interface IOrder {
  menuData: any;
  nome: string;
  setNome: any;
  telefone: string;
  setTelefone: any;
  unidade: string;
  setUnidade: any;
  mesa: string;
  setMesa: any;
  orderItems: Map<string, OrderItemData>;
  setOrderItems: ActionDispatch<[action: IItemsAction]>;
  orderItemsCount: number;
  orderItemsPriceTotal: string;
  isLoading: boolean;
  setIsLoading: any;
}

const OrderContext = createContext<IOrder>({} as IOrder);

type IItemsAction = {
  type: "include" | "increase" | "decrease" | "exclude" | "clear";
  item?: ItemData;
}

function itemsReducer(state: Map<string, OrderItemData>, action: IItemsAction) {
  if (action.type == "clear") {
    return new Map<string, OrderItemData>();
  }
  const newState = new Map(state);
  const itemName = `${action.item?.categoria} - ${action.item?.item}`;
  switch (action.type) {
    case "include":
      newState.set(itemName, { itemData: action.item!, amount: 1 });
      break;
    case "increase":
      newState.get(itemName)!.amount++;
      break;
    case "decrease":
      newState.get(itemName)!.amount--;
      break;
    case "exclude":
      newState.delete(itemName);
      break;
    default:
      break;
  }
  return newState;
};

export const OrderProvider = ({ menuData, children }: { menuData: any, children: any}) => {
  const menu = useMemo(() => menuData, []);
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("(67)");
  const [unidade, setUnidade] = useState<string>("1");
  const [mesa, setMesa] = useState<string>("");
  const [orderItems, setOrderItems] = useReducer(itemsReducer, new Map<string, OrderItemData>([]));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("nome")) setNome(localStorage.getItem("nome") ?? "");
    if (localStorage.getItem("telefone")) setTelefone(localStorage.getItem("telefone") ?? "(67)");
    if (sessionStorage.getItem("unidade")) setUnidade(sessionStorage.getItem("unidade") ?? "1");
    if (sessionStorage.getItem("mesa")) setMesa(sessionStorage.getItem("mesa") ?? "");
  }, []);

  const orderItemsCount = useMemo(() => {
    let count = 0;
    [...orderItems.values()].forEach((orderItemData) => {
      count += orderItemData.amount;
    });
    return count;
  }, [orderItems]);

  const orderItemsPriceTotal = useMemo(() => {
    let price = 0;
    [...orderItems.values()].forEach((orderItemData) => {
      price += orderItemData.itemData.preco * orderItemData.amount;
    });
    return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(price);
  }, [orderItems]);

  return (
    <OrderContext.Provider
      value={{
        menuData: menu,
        nome,
        setNome,
        telefone,
        setTelefone,
        unidade,
        setUnidade,
        mesa,
        setMesa,
        orderItems,
        setOrderItems,
        orderItemsCount,
        orderItemsPriceTotal,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("Context is undefined");
  }
  return context;
}
