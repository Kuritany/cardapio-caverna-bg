'use client'
import { Button } from "react-bootstrap";
import { useOrderContext } from "./orderProvider";
import { FaEraser } from "react-icons/fa";
import { useState } from "react";
import FinishOrderModal from "./finishOrderModal";

export default function Footer() {
  const { orderItems, setOrderItems, orderItemsCount, orderItemsPriceTotal } = useOrderContext();
  
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

  return (
    <div className="p-2 align-bottom d-flex position-absolute bottom-0 vw-100">
      <Button
        variant="primary"
        className="w-100 me-2"
        disabled={orderItems.size == 0}
        onClick={handleShow}
      >
        Fazer Pedido ({orderItemsCount} itens, {orderItemsPriceTotal})
      </Button>
      <Button
        variant="danger"
        disabled={orderItems.size == 0}
        onClick={() => setOrderItems({ type: "clear" })}
      >
        <FaEraser />
      </Button>
      <FinishOrderModal show={showModal} onClose={handleClose} />
    </div>
  );
}
