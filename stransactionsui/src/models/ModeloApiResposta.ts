export interface ModeloApiResposta<T> {
  erroNoServidor: boolean;
  erroNaRequisicao: boolean;
  dados: T[];
}
