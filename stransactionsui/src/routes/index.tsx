import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Company from "../pages/Company";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

// import { Container } from './styles';

const AppRoutes: React.FC = () => {
  const [logado, setLogado] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem("admin-sindcos-logado")) {
      setLogado(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/login"
          element={<Login setLogado={() => setLogado(true)} />}
        />
        {logado && <Route path="/admin" element={<Admin />} />}
        <Route path="*" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
