using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
using STransactions.Aplicacao.Dados;
using STransactions.Aplicacao.Enums;
using STransactions.Aplicacao.ModelosBanco;
using STransactions.UI.API.Aplicacao.ModelosVisualizacao;
using static System.Net.Mime.MediaTypeNames;
using System;

namespace STransactions.UI.API.Aplicacao
{
    public class ServicosEmpresa
    {
        private readonly SindCosContexto _contexto;

        public ServicosEmpresa(SindCosContexto contexto)
        {
            _contexto = contexto;
        }
        public async Task<RespostaUIModeloVisualizacao<Empresa>> EntrarNaAplicacao(string cnpj)
        {
            try
            {
                var empresaSolicitante = await _contexto.Empresas.FirstOrDefaultAsync(e => e.CNPJ == cnpj);
                List<Empresa> resposta = new();
                if (empresaSolicitante is null)
                {
                    var novaEmpresaNaoCadastrada = new Empresa(cnpj);
                    await _contexto.Empresas.AddAsync(novaEmpresaNaoCadastrada);
                    empresaSolicitante = novaEmpresaNaoCadastrada;
                }
                await _contexto.LogsGeral.AddAsync(new($"Empresa entrou na aplicação : {cnpj}", ELogAplicacaoGrau.Login));
                await _contexto.SaveChangesAsync();
                return new RespostaUIModeloVisualizacao<Empresa>(resposta);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                await _contexto.LogsGeral.AddAsync(new($"Erro no servidor da aplicação ''{e.Message}''", ELogAplicacaoGrau.ErroGrave));
                await _contexto.SaveChangesAsync();
                return new RespostaUIModeloVisualizacao<Empresa>();
            }
        }
        static float ConverterDinheiroParaFloat(string dinheiroFormatado)
        {
            string valorNumerico = new string(dinheiroFormatado.Where(char.IsDigit).ToArray());
            if (float.TryParse(valorNumerico, out float resultado))
            {
                resultado /= 100;
                return resultado;
            }
            return 0f;
        }
        public async Task<RespostaUIModeloVisualizacao<SolicitacaoBoleto>> SolicitarBoleto(string cnpj, string valorBoletoFormatado, string emailContato, string competencia,ETipoEmpresaContribuicao contribuicao)
        {
            try
            {
                double valorBoleto = ConverterDinheiroParaFloat(valorBoletoFormatado);
                Empresa? empresaSolicitante = await _contexto.Empresas.Include(e=> e.TipoContribuicao).FirstOrDefaultAsync(e => e.CNPJ == cnpj);
                if (empresaSolicitante is null)
                {
                    await _contexto.LogsGeral.AddAsync(new($"A empresa com o CNPJ {cnpj} teve um erro crítico/não esperado na criação, e solicitou um boleto com valor {valorBoleto}, {emailContato} e competencia {competencia}", ELogAplicacaoGrau.ErroGrave));
                    await _contexto.SaveChangesAsync();
                    return new RespostaUIModeloVisualizacao<SolicitacaoBoleto>() { ErroNoServidor = true };
                }
                else
                {
                    if (empresaSolicitante.Email is null) empresaSolicitante.Email = emailContato;
                    if (empresaSolicitante.Competencia is null) empresaSolicitante.Competencia = competencia;
                    if(empresaSolicitante.TipoContribuicao.Any(e=> e.Tipo != contribuicao) || empresaSolicitante.TipoContribuicao.Count == 0)
                    {
                        empresaSolicitante.TipoContribuicao.Add(new(contribuicao));
                    }
                }
                var novaSolicitacao = new SolicitacaoBoleto(valorBoleto, emailContato, competencia);
                empresaSolicitante.SolicitarBoleto(novaSolicitacao);
                await _contexto.LogsGeral.AddAsync(new($"Solicitação de boleto para a empresa {cnpj} criado com sucesso", ELogAplicacaoGrau.Sucesso));
                await _contexto.SaveChangesAsync();
                var resposta = new List<SolicitacaoBoleto>() { novaSolicitacao };
                return new RespostaUIModeloVisualizacao<SolicitacaoBoleto>(resposta);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                await _contexto.LogsGeral.AddAsync(new($"Erro no servidor da aplicação ''{e.Message}''", ELogAplicacaoGrau.ErroGrave));
                await _contexto.SaveChangesAsync();
                return new RespostaUIModeloVisualizacao<SolicitacaoBoleto>() { ErroNoServidor = true };
            }
        }
    }
}
