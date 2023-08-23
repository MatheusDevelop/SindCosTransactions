using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STransactions.Aplicacao.ModelosBanco
{
    public class LogsEmpresa:Entidade
    {
        public LogsEmpresa(string descricao)
        {
            Descricao = descricao;
        }

        public string Descricao { get; set; }
    }
}
