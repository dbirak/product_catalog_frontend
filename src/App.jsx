import "./App.css";
import ProtectRoute from "./utils/ProtectRoute";
import Login from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />}></Route>

        <Route element={<ProtectRoute role="null" />}>
          //
          <Route path="/login" element={<Login />} exact />
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
