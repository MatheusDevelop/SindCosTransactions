import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useMask, presets } from "mask-hooks";
import { Box, Button, CircularProgress } from "@mui/material";
import api from "../../../../api";

export default function CompanyLoginForm({
  nextStep,
}: {
  nextStep(p: string): void;
}) {
  const [form, setForm] = React.useState<{ cnpj: string }>({
    cnpj: "",
  });
  const [loading, setLoading] = React.useState(false);
  const cnpjMask = useMask(presets.DOCUMENT_CNPJ);
  const handleSubmit = async () => {
    if (form.cnpj) {
      setLoading(true);
      try {
        await api.post("empresas/login", form);
        nextStep(form.cnpj);
        setForm({
          cnpj: "",
        });
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
        Informação da empresa
      </Typography>
      <Grid item xs={12} sm={6}>
        <TextField
          label="CNPJ"
          fullWidth
          variant="standard"
          value={form?.cnpj}
          onChange={(e) =>
            setForm((s) => ({ ...s, cnpj: cnpjMask(e.target.value) }))
          }
        />
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 3, ml: 1 }}
          endIcon={loading && <CircularProgress size={12} />}
        >
          Proximo passo
        </Button>
      </Box>
    </React.Fragment>
  );
}
