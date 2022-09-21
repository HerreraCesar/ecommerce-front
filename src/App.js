import "react-toastify/dist/ReactToastify.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Auth from "./components/auth/Auth";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Details from "./components/details/Details";
import Header from "./components/header/Header";
import NotFound from "./components/not-found/NotFound";
import Orders from "./components/orders/Orders";
import Products from "./components/products/Products";
import Support from "./components/support/Support";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth);
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user.validated === true ? (
              <Navigate to="/productos" />
            ) : (
              <Navigate to="/autenticacion" />
            )
          }
        />
        <Route path="/autenticacion" element={<Auth />} />
        <Route path="/soporte" element={<Support />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/resumen" element={<Checkout />} />
        <Route path="/ordenes" element={<Orders />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:category" element={<Products />} />
        <Route path="/productos/detalles/:id" element={<Details />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
