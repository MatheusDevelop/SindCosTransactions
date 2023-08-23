namespace STransactions.UI.API.Aplicacao.ModelosVisualizacao
{
    public class RespostaUIModeloVisualizacao<T>
    {
        public bool ErroNaRequisicao { get; set; }
        public bool ErroNoServidor { get; set; }
        public List<T> Dados { get; set; } = new();
        public RespostaUIModeloVisualizacao()
        {
            
        }
        public RespostaUIModeloVisualizacao(List<T> dados)
        {
            Dados = dados;
        }
    }
}