using Microsoft.EntityFrameworkCore;
using STransactions.Aplicacao.ModelosBanco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STransactions.Aplicacao.Dados
{
    public class SindCosContexto:DbContext
    {
        public SindCosContexto()
        {
            
        }
        public SindCosContexto(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public DbSet<SolicitacaoBoleto> Solicitacoes { get; set; }
        public DbSet<LogsAplicacao> LogsGeral { get; set; }
        public DbSet<Empresa> Empresas { get; set; }
    }
}
