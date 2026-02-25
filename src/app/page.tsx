import Menu from "./components/menu";
import { OrderProvider } from "./components/orderProvider";
import './styles.css';
import Footer from "./components/footer";
import MenuService from "./services/MenuService";
import LoadingSpinner from "./components/loadingSpinner";

export default async function Home() {
  const menuData = await MenuService.getMenuData();

  return (
    <OrderProvider menuData={menuData}>
      <div className="vh-100 d-flex flex-column">
        <div className="vw-100 position-absolute top-0">
          <h1 className="text-center" style={{ fontSize: "34px" }}>Cardápio Caverna BG</h1>
        </div>
        <Menu/>
        <Footer />
      </div>
      <LoadingSpinner />
    </OrderProvider>
  );
}
