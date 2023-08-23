using Microsoft.EntityFrameworkCore;
using STransactions.Aplicacao.Dados;
using STransactions.UI.API.Aplicacao;
using STransactions.UI.API.ModelosEntrada;
using STransactions.UI.API.Servicos;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<SindCosContexto>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddTransient<ServicosEmpresa, ServicosEmpresa>();
builder.Services.AddTransient<ServicosAdmin, ServicosAdmin>();
builder.Services.AddCors();
var app = builder.Build();

app.MapPost("/empresas/login", async (ServicosEmpresa _servicos, EmpresaEntrarNaAplicacaoEntrada modelo) =>
    await _servicos.EntrarNaAplicacao(modelo.Cnpj)
);
app.MapPost("/empresas/solicitacao-boleto", async (ServicosEmpresa _servicos, EmpresaSolicitarBoletoEntrada modelo) =>
    await _servicos.SolicitarBoleto(modelo.Cnpj, modelo.ValorBoleto, modelo.Email, modelo.Competencia,modelo.Contribuicao)
);
app.MapGet("/admin/empresas", async (ServicosAdmin _servicos) =>
    await _servicos.LerTudo()
);
app.MapGet("/admin/app-logs", async (ServicosAdmin _servicos) =>
    await _servicos.LerLogsApp()
);

app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.Run();
