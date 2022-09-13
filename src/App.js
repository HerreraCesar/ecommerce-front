import "react-toastify/dist/ReactToastify.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Auth from "./components/auth/Auth";
import Cart from "./components/cart/Cart";
import Header from "./components/header/Header";
import Orders from "./components/orders/Orders";
import Products from "./components/products/Products";
import Support from "./components/support/Support";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.validated);
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user === true ? (
              <Navigate to="/productos" />
            ) : (
              <Navigate to="/autenticacion" />
            )
          }
        />
        <Route path="/autenticacion" element={<Auth />} />
        <Route path="/soporte" element={<Support />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/ordenes" element={<Orders />} />
        <Route path="/productos" element={<Products />} />
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
