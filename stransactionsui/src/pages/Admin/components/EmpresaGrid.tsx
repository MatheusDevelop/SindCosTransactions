export interface SolicitacaoBoleto {
  valor: number;
  emailContato: string;
  competencia: string;
  dataCriacao: Date;
}

export interface EmpresaGrid {
  cnpj: string;
  email: string;
  competencia: string;
  tipoContribuicao: { tipo: string }[];
  solicitacoes: SolicitacaoBoleto[];
}
