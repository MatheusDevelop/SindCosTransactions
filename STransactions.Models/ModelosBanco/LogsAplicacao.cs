using STransactions.Aplicacao.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STransactions.Aplicacao.ModelosBanco
{
    public class LogsAplicacao:Entidade
    {
        public LogsAplicacao(string descricao, ELogAplicacaoGrau grau)
        {
            Descricao = descricao;
            Grau = grau;
        }

        public string Descricao { get; set; }
        public ELogAplicacaoGrau Grau { get; set; }
    }
}
