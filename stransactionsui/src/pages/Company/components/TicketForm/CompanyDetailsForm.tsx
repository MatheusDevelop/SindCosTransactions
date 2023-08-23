import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { EmpresaSolicitarBoletoEntrada } from "../../../../models/EmpresaSolicitarBoletoEntrada";
import { useMask, presets } from "mask-hooks";
import { Box, Button, CircularProgress, MenuItem } from "@mui/material";
import api from "../../../../api";

export default function CompanyDetailsForm({
  nextStep,
  cnpj,
}: {
  nextStep(cnpj?: string): void;
  cnpj: string;
}) {
  const [form, setForm] = React.useState<EmpresaSolicitarBoletoEntrada>({
    cnpj,
    competencia: "",
    contribuicao: 0,
    valorBoleto: "",
    email: "",
  });
  const [loading, setLoading] = React.useState(false);
  const cnpjMask = useMask(presets.DOCUMENT_CNPJ);
  const competenciaMask = useMask({ masks: ["##/####"] });
  const valorMask = useMask(presets.CURRENCY_PTBR);
  const handleSubmit = async () => {
    if (form.cnpj && form.competencia && form.valorBoleto && form.email) {
      setLoading(true);
      try {
        await api.post("empresas/solicitacao-boleto", form);
        setForm({
          cnpj: "",
          competencia: "",
          contribuicao: 0,
          valorBoleto: "",
          email: "",
        });
        nextStep();
      } catch (error) {
        alert("Erro ao enviar os dados");
      }
      setLoading(false);
    } else {
      alert("Preencha todos os campos obrigatórios.");
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dados da empresa
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CNPJ"
            fullWidth
            variant="standard"
            disabled
            value={form?.cnpj}
            onChange={(e) =>
              setForm((s) => ({ ...s, cnpj: cnpjMask(e.target.value) }))
            }
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Tipo Contribuição"
            select
            variant="standard"
            fullWidth
            value={form.contribuicao}
            onChange={(e) =>
              setForm({ ...form, contribuicao: +e.target.value })
            }
          >
            <MenuItem value="0">Assistencial</MenuItem>
            <MenuItem value="1">Mensalidade</MenuItem>
            <MenuItem value="2">Sindical</MenuItem>
            <MenuItem value="3">Confederativa</MenuItem>
            <MenuItem value="4">Socio Usuário</MenuItem>
            <MenuItem value="5">Associativa</MenuItem>
            <MenuItem value="6">PLR</MenuItem>
            <MenuItem value="7">Acordo</MenuItem>
            <MenuItem value="8">Emolumento ADM</MenuItem>
            <MenuItem value="9">Negocial</MenuItem>
            <MenuItem value="10">Contribuição</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Competência"
            fullWidth
            value={form?.competencia}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                competencia: competenciaMask(e.target.value),
              }))
            }
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="R$ Valor boleto"
            fullWidth
            variant="standard"
            value={form?.valorBoleto}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                valorBoleto: valorMask(e.target.value),
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            label="Email para envio do boleto"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 3, ml: 1 }}
          endIcon={loading && <CircularProgress size={12} />}
        >
          Solicitar boleto
        </Button>
      </Box>
    </React.Fragment>
  );
}
