using STransactions.Aplicacao.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STransactions.Aplicacao.ModelosBanco
{
    public class Empresa:Entidade
    {
        public Empresa(string cNPJ)
        {
            CNPJ = cNPJ;
        }

        public string CNPJ { get; set; }
        public string? Email { get; set; }
        public string? Competencia { get; set; }
        public int? NumeroEmpregados { get; set; }
        public List<TipoContribuicao> TipoContribuicao { get; set; } = new();
        public List<SolicitacaoBoleto> Solicitacoes { get; set; } = new();
        public List<LogsEmpresa> LogsDaEmpresa { get; set; } = new();
        public void SolicitarBoleto(SolicitacaoBoleto solicitacaoBoleto)
        {
            Solicitacoes.Add(solicitacaoBoleto);
            LogsDaEmpresa.Add(new($"A empresa {CNPJ} solicitou um novo boleto, id {solicitacaoBoleto.Id}."));
        }
    }
}
