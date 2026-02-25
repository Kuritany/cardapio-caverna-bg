import Menu from "./components/menu";
import { OrderProvider } from "./components/orderProvider";
import './styles.css';
import Footer from "./components/footer";
import MenuService from "./services/MenuService";

export default async function Home() {
  const menuData = await MenuService.getMenuData();

  return (
    <OrderProvider menuData={menuData}>
      <div className="vh-100 d-flex flex-column">
        <div className="vw-100 position-absolute top-0">
          <h1 className="text-center">Cardápio Caverna BG</h1>
        </div>
        <Menu/>
        <Footer />
      </div>
    </OrderProvider>
  );
}

/*
TO DO:
 - Add spinner
 - validate fields
 - mask phone
 - send whatsapp notification -> manual (no server login)
 - send whatsapp notification -> automated (with server login)
 - look up orders




*/