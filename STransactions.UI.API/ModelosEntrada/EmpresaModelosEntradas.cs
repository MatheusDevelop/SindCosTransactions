using STransactions.Aplicacao.Enums;

namespace STransactions.UI.API.ModelosEntrada
{
    public class EmpresaEntrarNaAplicacaoEntrada
    {
        public string Cnpj { get; set; }
    }
    public class EmpresaSolicitarBoletoEntrada
    {
        public string Cnpj { get; set; }
        public string Email { get; set; }
        public string Competencia { get; set; }
        public string ValorBoleto { get; set; }
        public ETipoEmpresaContribuicao Contribuicao { get; set; }
    }
}
