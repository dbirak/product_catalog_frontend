import "./App.css";
import ProtectRoute from "./utils/ProtectRoute";
import Login from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import Category from "./pages/admin/Category/Category";
import Product from "./pages/admin/Product/Product";
import Setting from "./pages/admin/Setting/Setting";
import Index from "./pages/index/Index";
import ProductItem from "./pages/Product/ProductItem";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Routes>
        <Route element={<ProtectRoute role="null" />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/" element={<Index />}></Route>
          <Route path="/product/:id" element={<ProductItem />}></Route>
        </Route>

        <Route element={<ProtectRoute role="admin" />}>
          <Route path="/admin/category" element={<Category />} exact />
          <Route path="/admin/product" element={<Product />} exact />
          <Route path="/admin/settings" element={<Setting />} exact />
        </Route>

        <Route element={<ProtectRoute role="null" />}></Route>

        <Route
          path="*"
          element={
            <p className="mt-10 text-center text-[30px]">
              Błąd 404 - Nie znaleziono podanego adresu
            </p>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
