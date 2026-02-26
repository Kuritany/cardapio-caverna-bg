import OrdersService from "../services/OrdersService";
import { OrderData } from "../types/ItemData";
import { useOrderContext } from "./orderProvider";


export default async function OrderPoster({ onClose }: {  onClose: () => void }) {
  const {
    nome,
    telefone,
    unidade,
    mesa,
    orderItems,
    observacao,
    setIsLoading,
    setOrderItems
  } = useOrderContext();

  try {
    if (!nome) throw Error('Campo "Nome" deve ser informado.');
    if (!telefone || telefone.length != 15) throw Error('Campo "Telefone" deve ser informado.');
    if (!unidade) throw Error('Campo "Unidade" deve ser informado.');
    if (!mesa) throw Error('Campo "Mesa" deve ser informado.');
    const status = await OrdersService.postOrder(
      {
        nome,
        telefone,
        unidade,
        mesa,
        orderItems: [...orderItems.values()],
        observacao
      }
    );
    setOrderItems({ type: "clear" });
    onClose();
  } catch(e: any) {
    alert(e.message);
  }
  finally {      
    setIsLoading(false);
  }

  return <></>;
}
