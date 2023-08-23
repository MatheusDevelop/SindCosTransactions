import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Sindicato cos.
          </Typography>
        </Toolbar>
      </AppBar>
      <AppRoutes />
    </>
  );
}

export default App;
