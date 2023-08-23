using STransactions.Aplicacao.Enums;
using System.Text.Json.Serialization;

namespace STransactions.Aplicacao.ModelosBanco
{
    public class TipoContribuicao:Entidade
    {
        [JsonIgnore]
        public List<Empresa> Empresas { get; set; } = new();
        public ETipoEmpresaContribuicao Tipo { get; set; }

        public TipoContribuicao(ETipoEmpresaContribuicao tipo)
        {
            Tipo = tipo;
        }
    }
}