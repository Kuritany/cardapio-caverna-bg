'use client'
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useOrderContext } from "./orderProvider";
import Modal from 'react-bootstrap/Modal';
import { OrderItemData } from "../types/ItemData";
import OrdersService from "../services/OrdersService";

type Props = {
  show: boolean;
  onClose: () => void;
}

export default function FinishOrderModal({ show, onClose }: Props) {
  const {
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
    orderItemsPriceTotal
  } = useOrderContext();

  function handleBlur(field: string, value: string, storageType: "local" | "session") {
    let storage;
    switch (storageType) {
      case "local":
        storage = localStorage;
        break;
      case "session":
        storage = sessionStorage;
        break;
    }
    storage.setItem(field, value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const status = await OrdersService.postOrder(
      {
        nome,
        telefone,
        unidade,
        mesa,
        orderItems: orderItems.values().toArray(),
        observacao: e.target.observacao.value
      }
    );
    if (status) setOrderItems({ type: "clear" });
    else alert("Occoreu um erro ao realizar seu pedido, entre em contato com a administração.");
    onClose();
  }
  
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Finalizar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex mb-3">
            <Form.Control
              name="nome"
              placeholder="Nome"
              className="me-3"
              onChange={(e) => setNome(e.target.value)}
              defaultValue={nome}
              onBlur={() => handleBlur("nome", nome, "local")}
            />
            <InputGroup className="d-flex flex-nowrap">
              <Form.Control
                placeholder="DDD"
                aria-label="DDD"
                aria-describedby="basic-addon1"
                style={{ width: "30px" }}
                defaultValue="67"
                maxLength={4}
              />
              <Form.Control
                placeholder="Telefone"
                className="w-100"
                maxLength={10}
                type="text"
                onChange={(e) => setTelefone(e.target.value)}
                defaultValue={telefone}
                onBlur={() => handleBlur("telefone", telefone, "local")}
              />
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <Form.Select
              name="unidade"
              className="me-3"
              onChange={(e) => setUnidade(e.target.value)}
              defaultValue={unidade}
              onBlur={() => handleBlur("unidade", unidade, "session")}
            >
              <option disabled selected value={undefined}>Unidade</option>
              <option value="1">Caverna 1</option>
              <option value="2">Caverna 2</option>
            </Form.Select>
            <Form.Control
              name="mesa"
              placeholder="Mesa"
              maxLength={2}
              type="number"
              onChange={(e) => setMesa(e.target.value)}
              defaultValue={mesa}
              onBlur={() => handleBlur("mesa", mesa, "session")}
            />
          </div>
          <Form.Control
            name="observacao"
            placeholder="Observação"
            className="mb-3"
          />
          <div className="d-flex justify-content-between align-items-start p-1">
            <b className="me-1">Total:</b>{orderItemsCount} ite{orderItemsCount > 1 ? 'ns' : 'm'}
            <span className='ms-auto'>
              {orderItemsPriceTotal}
            </span>
          </div>
          <div className="overflow-y-scroll">
            <ListGroup>
              {orderItems.entries().map((item: [string, OrderItemData], index: number) => (
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start p-1">
                    <div className="w-100 d-flex me-1">
                      {item[1].amount}X {item[0]}
                      <span className='ms-auto'>
                        {new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(item[1].amount * item[1].itemData.preco)}
                      </span>
                    </div>
                </ListGroup.Item>
              ))}
              </ListGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">Finalizar Pedido</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

/*
AKfycbz_5i5Djv3bIaTtWei9sQTHIc8-zfhhyZmdiXs79OMZ2i8Ncba0Kv7jfpdK9vCWU9h0

https://script.google.com/macros/s/AKfycbz_5i5Djv3bIaTtWei9sQTHIc8-zfhhyZmdiXs79OMZ2i8Ncba0Kv7jfpdK9vCWU9h0/exec

Nome	Telefone	Unidade	Mesa	Item	Valor	DataHora	Cancelado	Pago

*/