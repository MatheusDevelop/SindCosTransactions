using Microsoft.EntityFrameworkCore;
using STransactions.Aplicacao.Dados;
using STransactions.Aplicacao.Enums;
using STransactions.Aplicacao.ModelosBanco;
using STransactions.UI.API.Aplicacao.ModelosVisualizacao;

namespace STransactions.UI.API.Servicos
{
    public class ServicosAdmin
    {
        private readonly SindCosContexto _contexto;

        public ServicosAdmin(SindCosContexto contexto)
        {
            _contexto = contexto;
        }
        public async Task<RespostaUIModeloVisualizacao<Empresa>> LerTudo()
        {
            var empresas = await _contexto.Empresas.Include(e => e.LogsDaEmpresa).Include(e=> e.TipoContribuicao).Include(e => e.Solicitacoes).ToListAsync();
            return new RespostaUIModeloVisualizacao<Empresa>(empresas);
        }
        public async Task<RespostaUIModeloVisualizacao<LogsAplicacao>> LerLogsApp()
        {
            var logs = await _contexto.LogsGeral.ToListAsync();
            return new RespostaUIModeloVisualizacao<LogsAplicacao>(logs);
        }
    }
}
