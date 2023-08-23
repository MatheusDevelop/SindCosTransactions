using STransactions.Aplicacao.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STransactions.Aplicacao.ModelosBanco
{
    public class SolicitacaoBoleto : Entidade
    {
        public SolicitacaoBoleto(double valor,string emailContato, string competencia)
        {
            Valor = valor;
            Status = ELogBoletoStatus.Solicitado;
            EmailContato = emailContato;
            Competencia = competencia;
        }

        public double Valor { get; set; }
        public string EmailContato { get; set; }
        public string Competencia { get; set; }
        public ELogBoletoStatus Status { get; set; }
    }
}
