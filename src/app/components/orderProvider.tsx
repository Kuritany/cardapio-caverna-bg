'use client'
import { ActionDispatch, createContext, useContext, useMemo, useReducer, useState } from "react";
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
  const [nome, setNome] = useState<string>(localStorage.getItem("nome") ?? "");
  const [telefone, setTelefone] = useState<string>(localStorage.getItem("telefone") ?? "(67)");
  const [unidade, setUnidade] = useState<string>(sessionStorage.getItem("unidade") ?? "1");
  const [mesa, setMesa] = useState<string>(sessionStorage.getItem("mesa") ??  "");
  const [orderItems, setOrderItems] = useReducer(itemsReducer, new Map<string, OrderItemData>());
  const [isLoading, setIsLoading] = useState(false);

  const orderItemsCount = useMemo(() => {
    let count = 0;
    orderItems.values().forEach((orderItemData) => {
      count += orderItemData.amount;
    });
    return count;
  }, [orderItems]);

  const orderItemsPriceTotal = useMemo(() => {
    let price = 0;
    orderItems.values().forEach((orderItemData) => {
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
