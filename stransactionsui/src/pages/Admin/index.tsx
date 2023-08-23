import React from "react";
import CompaniesStatus from "./components/CompaniesStatus";
import { EmpresaGrid } from "./components/EmpresaGrid";
import api from "../../api";
import { ModeloApiResposta } from "../../models/ModeloApiResposta";
import { Backdrop, CircularProgress } from "@mui/material";

// import { Container } from './styles';

const Admin: React.FC = () => {
  const [companiesStatus, setCompaniesStatus] = React.useState<EmpresaGrid[]>(
    []
  );
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    setLoading(true);
    const { data } = await api.get<ModeloApiResposta<EmpresaGrid>>(
      "admin/empresas"
    );
    console.log(data);
    if (!data.erroNoServidor && !data.erroNaRequisicao) {
      setCompaniesStatus(data.dados);
    } else {
      alert("Erro ao requisitar os dados");
    }
    setLoading(false);
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CompaniesStatus rows={companiesStatus} />
    </>
  );
};

export default Admin;
