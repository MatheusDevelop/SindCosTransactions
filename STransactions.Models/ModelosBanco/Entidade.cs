namespace STransactions.Aplicacao.ModelosBanco
{
    public class Entidade
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; } = DateTime.Now.ToUniversalTime();

    }
}