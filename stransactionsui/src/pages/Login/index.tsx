import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper } from "@mui/material";

export default function Login({ setLogado }: { setLogado(): void }) {
  const [form, setForm] = React.useState<{ email: string; pass: string }>({
    email: "",
    pass: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (form.pass != "q1w2e3r4" && form.email != "francisco@mastherplus.com.br")
      alert("Login invalido");
    else {
      setLogado();
      localStorage.setItem("admin-sindcos-logado", "true");
      navigate("/admin");
    }
  };
  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Login
          </Typography>
          <React.Fragment>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                variant="standard"
                value={form?.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
              />
              <TextField
                label="Senha"
                fullWidth
                type="password"
                variant="standard"
                value={form?.pass}
                onChange={(e) =>
                  setForm((s) => ({ ...s, pass: e.target.value }))
                }
              />
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, ml: 1 }}
              >
                Entrar
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
