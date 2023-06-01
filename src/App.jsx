import "./App.css";
import ProtectRoute from "./utils/ProtectRoute";
import Login from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index/Index";
import Category from "./pages/admin/Category/Category";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectRoute role="null" />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/" element={<Index />}></Route>
        </Route>

        <Route element={<ProtectRoute role="admin" />}>
          <Route path="/admin/category" element={<Category />} exact />
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
