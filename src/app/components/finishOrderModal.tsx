'use client'
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useOrderContext } from "./orderProvider";
import Modal from 'react-bootstrap/Modal';
import { OrderItemData } from "../types/ItemData";
import OrdersService from "../services/OrdersService";
import { ChangeEvent, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { MaskPhoneInput } from "../helpers/phoneMaskHelper";

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
    orderItemsPriceTotal,
    setIsLoading
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
    setIsLoading(true);
    try {
      validateFields();
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
      setOrderItems({ type: "clear" });
      onClose();
      // UseWhatsapp("5567999580041", generateOrderMessage(e.target.observacao.value));
    } catch(e: any) {
      alert(e.message);
    }
    finally {      
      setIsLoading(false);
    }
  }

  // function generateOrderMessage(observacao?: string) {
  //   let message = "";
  //   message += `${nome} - ${telefone}`;
  //   message += `\nCaverna ${unidade} - Mesa ${mesa}`;
  //   orderItems.forEach((item) => {
  //     message += `\n${item.amount}X ${item.itemData.categoria} - ${item.itemData.item}`;
  //   });
  //   if (observacao) message += `\nObservação: ${observacao}`;
  //   return message;
  // }

  function validateFields() {
    if (!nome) throw Error('Campo "Nome" deve ser informado.');
    if (!telefone || telefone.length != 15) throw Error('Campo "Telefone" deve ser informado.');
    if (!unidade) throw Error('Campo "Unidade" deve ser informado.');
    if (!mesa) throw Error('Campo "Mesa" deve ser informado.');
  }

  function handleChangeTelefone(e: any) {
    const masked = MaskPhoneInput(e.target.value, "(99) 99999-9999");
    setTelefone(masked);
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
              {/* <Form.Control
                placeholder="DDD"
                aria-label="DDD"
                aria-describedby="basic-addon1"
                style={{ width: "30px" }}
                defaultValue="67"
                maxLength={4}
              /> */}
              <Form.Control
                placeholder="Telefone"
                className="w-100"
                type="text"
                onChange={handleChangeTelefone}
                defaultValue={telefone}
                onBlur={() => handleBlur("telefone", telefone, "local")}
                value={telefone}
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
