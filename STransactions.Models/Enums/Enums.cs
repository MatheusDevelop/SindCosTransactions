using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STransactions.Aplicacao.Enums
{
    public enum ELogBoletoStatus {
        AguardandoSolicitacao,Solicitado, Emitido
    }
    public enum ETipoEmpresaContribuicao 
    {
        ASSISTENCIAL,
        MENSALIDADE,
        SINDICAL,
        CONFEDERATIVA,
        SOCIO_USUARIO,
        ASSOCIATIVA,
        PLR,
        ACORDO,
        EMOLUMENTO_ADM,
        NEGOCIAL,
        CONTRIBUICAO
    }
    public enum ELogAplicacaoGrau {CriacaoELogin,Sucesso,ErroGrave,ErroBaixo,Login}

}
