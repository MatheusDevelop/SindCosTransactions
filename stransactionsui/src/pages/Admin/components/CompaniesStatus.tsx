import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { EmpresaGrid } from "./EmpresaGrid";
import moment from "moment";
moment.locale();
const ETipoEmpresaContribuicao = {
  ASSISTENCIAL: 0,
  MENSALIDADE: 1,
  SINDICAL: 2,
  CONFEDERATIVA: 3,
  SOCIO_USUARIO: 4,
  ASSOCIATIVA: 5,
  PLR: 6,
  ACORDO: 7,
  EMOLUMENTO_ADM: 8,
  NEGOCIAL: 9,
  CONTRIBUICAO: 10,
};
function getTipoContribuicao(numero: number) {
  switch (numero) {
    case ETipoEmpresaContribuicao.ASSISTENCIAL:
      return "Assistencial";
    case ETipoEmpresaContribuicao.MENSALIDADE:
      return "Mensalidade";
    case ETipoEmpresaContribuicao.SINDICAL:
      return "Sindical";
    case ETipoEmpresaContribuicao.CONFEDERATIVA:
      return "Confederativa";
    case ETipoEmpresaContribuicao.SOCIO_USUARIO:
      return "Socio usuario";
    case ETipoEmpresaContribuicao.ASSOCIATIVA:
      return "Associativa";
    case ETipoEmpresaContribuicao.PLR:
      return "PLR";
    case ETipoEmpresaContribuicao.ACORDO:
      return "Acordo";
    case ETipoEmpresaContribuicao.EMOLUMENTO_ADM:
      return "Emolumento ADM";
    case ETipoEmpresaContribuicao.NEGOCIAL:
      return "Negocial";
    case ETipoEmpresaContribuicao.CONTRIBUICAO:
      return "Contribuição";
    default:
      return "Tipo de contribuição desconhecido";
  }
}
function Row(props: { row: EmpresaGrid }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor:
            row.solicitacoes.length > 0
              ? "rgba(0, 255, 115, 0.55)"
              : "transparent",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.cnpj}
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.competencia}</TableCell>
        <TableCell>
          {row.tipoContribuicao
            .map((c) => {
              return getTipoContribuicao(+c.tipo);
            })
            .join(",")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography fontWeight={"bold"} gutterBottom component="div">
                Solicitações de boletos {row.cnpj}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 250 }}>Data</TableCell>
                    <TableCell style={{ width: 250 }}>Email</TableCell>
                    <TableCell style={{ width: 250 }}>Valor</TableCell>
                    <TableCell>Competencia</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.solicitacoes.map((log, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {moment(log.dataCriacao)
                          .local()
                          .format("DD/MM/YYYY, HH:mm")}
                      </TableCell>
                      <TableCell>{log.emailContato}</TableCell>
                      <TableCell>{log.valor.toFixed(2)}</TableCell>
                      <TableCell>{log.competencia}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function CompaniesStatus({ rows }: { rows: EmpresaGrid[] }) {
  return (
    <TableContainer component={Paper} sx={{ p: 5 }}>
      <Typography>Solicitações</Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>CNPJ</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Competencia</TableCell>
            <TableCell>Contribuição</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.cnpj} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
