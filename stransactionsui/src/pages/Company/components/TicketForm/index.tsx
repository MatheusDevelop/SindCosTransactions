import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CompanyDetailsForm from "./CompanyDetailsForm";
import CompanyLoginForm from "./CompanyLoginForm";
const steps = ["Entrar", "Info. boleto", "Confirmação"];
export default function TicketForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [cnpj, setCnpj] = React.useState("");
  const onTicketRequestEnd = async (cnpjOnLogin?: string) => {
    if (cnpjOnLogin) setCnpj(cnpjOnLogin);
    setActiveStep(activeStep + 1);
  };
  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Solicitação de boleto
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep == 0 && (
              <CompanyLoginForm nextStep={onTicketRequestEnd} />
            )}
            {activeStep == 1 && (
              <CompanyDetailsForm cnpj={cnpj} nextStep={onTicketRequestEnd} />
            )}
            {activeStep == 2 && (
              <>Boleto solicitado com sucesso, aguarde a confirmação</>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
