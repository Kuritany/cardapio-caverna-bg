'use client'
import { Badge, Button, ListGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useOrderContext } from './orderProvider';
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";

function Menu() {
  const { menuData, orderItems, setOrderItems: setItems } = useOrderContext();

  const defaultActiveKeyList: string[] = [];
  menuData.forEach((value: any, index: number) => {
    defaultActiveKeyList.push(index.toString());
  });

  function generateOrderButtons(category: string, item: any) {
    const itemName = `${category} - ${item?.item}`;
    const itemData = { categoria: category, item: item.item, preco: item.preco };

    // if (orderItems.keys().toArray().includes(itemName))
    //   return <>
    //     <Button
    //       onClick={(e) => {
    //         e.preventDefault();
    //         setItems({ type: orderItems.get(itemName)?.amount == 1 ? "exclude" : "decrease", item: itemData });
    //       }}
    //       variant="danger"
    //       className='p-1 d-flex align-items-center'
    //       style={{ height: '34px' }}
    //     >
    //       {orderItems.get(itemName)?.amount == 1 ? <BsFillTrash3Fill /> : <MdRemove />}
    //     </Button>
    //     <span className='mx-auto'>{orderItems.get(itemName)?.amount}</span>
    //     <Button
    //       onClick={(e) => {
    //         e.preventDefault();
    //         setItems({ type: "increase", item: itemData });
    //       }}
    //       className='p-1 d-flex align-items-center'
    //       style={{ height: '34px' }}
    //     >
    //       <MdAdd />
    //     </Button>
    //   </>;
    // else
      return <Button
        onClick={(e) => {
          e.preventDefault();
          setItems({ type: "include", item: itemData });
        }}
        className='p-1 w-100'
      >
        Add
      </Button>;
  }

  function getItemCountByCategory(category: string) {
    let number = 0;
    // orderItems.values().toArray().forEach((orderItemData) => {
    //   if (orderItemData.itemData.categoria == category) number += orderItemData.amount;
    // });
    return number > 0 ? <Badge bg="primary" className='ms-auto position-absolute' style={{ right: '50px'}} pill>{number}</Badge> : <></>;
  }

  return (
    <div
      className="overflow-y-scroll border-bottom border-top border-primary vw-100 position-absolute"
      style={{ top: "54px", bottom: "54px" }}
    >
      <Accordion defaultActiveKey={defaultActiveKeyList} alwaysOpen>
        {menuData.map((category: any, index: number) => (
          <Accordion.Item eventKey={index.toString()} key={'accordion-' + index}>
            <Accordion.Header className='w-100 relative'>
              {category.category}
              {getItemCountByCategory(category.category)}
            </Accordion.Header>
            <Accordion.Body className='p-0'>
              <ListGroup>
              {category.items.map((item: any, index: number) => (
                <ListGroup.Item key={'li-' + index} as="li" className="d-flex justify-content-between align-items-start p-2">
                  <div className="w-100 ms-2 me-auto">
                    <div className="fw-bold d-flex">
                      {item.item}
                      <span className='ms-auto'>
                        {new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(item.preco)}
                      </span>
                    </div>
                    {item.descricao}
                  </div>
                  <div className='ms-2 d-flex justify-content-around align-items-center' style={{ width: '95px'}}>
                    {generateOrderButtons(category.category, item)}
                  </div>
                </ListGroup.Item>
              ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>  
    </div>
    
  );
}

export default Menu;
