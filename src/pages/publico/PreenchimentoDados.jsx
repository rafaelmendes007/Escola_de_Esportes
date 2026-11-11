import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';
import { temConsentimento } from '../../utils/consentimento';
import { CampoSelect, CampoSimNao, CampoTexto } from './CamposInscricao';
import {
  DEFICIENCIAS, ESCOLARIDADES, FAIXAS_RENDA, FATORES_SANGUINEOS, PARENTESCOS, PESSOAS_RESIDENCIA, PLANOS_ODONTO,
  PLANOS_SAUDE, PROBLEMAS_SAUDE, SERIES, TAMANHOS_UNIFORME, TIPOS_ESCOLA, TIPOS_SANGUINEOS,
} from './opcoesInscricao';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const CINZA_BORDA = '#D1D5DB';

// Bloco numerado do formulário (ex.: "1. Dados do responsável")
function Secao({ numero, titulo, descricao, children }) {
  return (
    <section className="secao-card">
      <div className="secao-cabecalho">
        <span className="secao-numero">{numero}</span>
        <div>
          <h2 className="secao-titulo">{titulo}</h2>
          {descricao && <p className="secao-descricao">{descricao}</p>}
        </div>
      </div>
      <div className="grade-campos">{children}</div>
    </section>
  );
}

function PreenchimentoDados() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Responsável
    nomeResponsavel: '',
    cpfResponsavel: '',
    telefone: '',
    email: '',
    parentesco: '',
    parentescoOutro: '',
    escolaridade: '',
    escolaridadeOutro: '',
    pessoasResidencia: '',
    pessoasResidenciaOutro: '',
    rendaFamiliar: '',
    // Contato de emergência
    emergenciaNome: '',
    emergenciaTelefone: '',
    emergenciaParentesco: '',
    emergenciaParentescoOutro: '',
    // Aluno
    nomeAluno: '',
    nascimento: '',
    genero: '',
    cpfAluno: '',
    endereco: '',
    bairro: '',
    // Escola e uniforme
    tipoEscola: '',
    escola: '',
    serie: '',
    altura: '',
    peso: '',
    tamanhoUniforme: '',
    // Saúde do aluno
    planoSaude: '',
    planoSaudeOutro: '',
    planoOdonto: '',
    planoOdontoOutro: '',
    tipoSanguineo: '',
    fatorSanguineo: '',
    alergiaMedicamento: '',
    alergiaMedicamentoQual: '',
    medicamentoControlado: '',
    medicamentoControladoQual: '',
    alergiaAlimento: '',
    alergiaAlimentoQual: '',
    problemaSaude: '',
    problemaSaudeOutro: '',
    deficiencia: '',
    deficienciaOutro: '',
    atencaoEspecial: '',
    atencaoEspecialQual: '',
  });

  // Manipular mudanças de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    console.log('Dados para envio:', formData);
    // Aqui você faria a chamada da API
    navigate('/inscricao');
  };

  // Sem o aceite dos termos, volta para a tela de consentimento
  if (!temConsentimento()) {
    return <Navigate to="/inscricao/consentimento" replace />;
  }

  // Props repetidas em todos os campos
  const campo = { dados: formData, onChange: handleInputChange };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#F7F8FA' }}>
      <style>{`
        .botao-voltar {
          background: none;
          border: none;
          color: ${AZUL_ESCURO};
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          transition: color 0.3s ease;
        }
        .botao-voltar:hover { color: ${AZUL}; }

        .secao-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .secao-cabecalho {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #F0F1F3;
        }
        .secao-numero {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: ${AZUL};
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .secao-titulo {
          color: ${AZUL_ESCURO};
          font-size: 1.1rem;
          font-weight: 600;
          margin: 2px 0 0;
        }
        .secao-descricao {
          color: #6B7280;
          font-size: 0.85rem;
          margin: 0.25rem 0 0;
        }

        /* Campos em 2 colunas; grupos de opções ocupam a linha inteira */
        .grade-campos {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem 1.5rem;
        }
        .campo-inteiro { grid-column: 1 / -1; }
        @media (max-width: 768px) {
          .grade-campos { grid-template-columns: 1fr; }
        }

        .label-campo {
          color: ${AZUL_ESCURO};
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          display: block;
        }
        .label-obrigatorio::after {
          content: ' *';
          color: #EF4444;
        }
        .dica-campo {
          color: #6B7280;
          font-size: 0.75rem;
          margin-top: 0.35rem;
        }

        .campo-input,
        .campo-select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid ${CINZA_BORDA};
          border-radius: 6px;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          color: ${AZUL_ESCURO};
          background-color: #FFFFFF;
          transition: border-color 0.3s ease;
        }
        .campo-input::placeholder { color: #9CA3AF; }
        .campo-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239CA3AF' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 30px;
        }
        .campo-input:focus,
        .campo-select:focus {
          outline: none;
          border-color: ${AZUL};
          box-shadow: 0 0 0 3px rgba(0, 71, 184, 0.1);
        }

        .botao-enviar {
          background-color: ${AZUL};
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          min-width: 220px;
        }
        .botao-enviar:hover { background-color: #0039A0; }
      `}</style>

      <HeaderPublico />

      <main className="flex-grow-1 w-100 py-4 px-3">
        <form className="mx-auto" style={{ maxWidth: '920px' }} onSubmit={handleEnviar}>
          <button type="button" onClick={() => navigate('/')} className="botao-voltar mb-4">
            <span>←</span>
            Voltar
          </button>

          <div className="mb-4">
            <h1 style={{ color: AZUL_ESCURO, fontSize: '2rem', fontWeight: 600, lineHeight: 1.2, marginBottom: '0.3rem' }}>
              Dados para inscrição
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: 0 }}>
              Preencha as informações abaixo para entrar na lista de espera. Campos com <span style={{ color: '#EF4444' }}>*</span> são obrigatórios.
            </p>
          </div>

          <Secao numero={1} titulo="Dados do responsável">
            <CampoTexto rotulo="Nome completo" obrigatorio nome="nomeResponsavel" placeholder="Ex.: Maria Silva" {...campo} />
            <CampoTexto rotulo="CPF do responsável" obrigatorio nome="cpfResponsavel" placeholder="000.000.000-00" dica="Usado para acompanhar a inscrição." {...campo} />
            <CampoTexto rotulo="Telefone (WhatsApp)" obrigatorio nome="telefone" tipo="tel" placeholder="(85) 99999-9999" {...campo} />
            <CampoTexto rotulo="E-mail" nome="email" tipo="email" placeholder="Ex.: maria@email.com" {...campo} />
            <CampoSelect rotulo="Parentesco com o aluno" obrigatorio nome="parentesco" opcoes={PARENTESCOS} {...campo} />
            <CampoSelect rotulo="Escolaridade do responsável" obrigatorio nome="escolaridade" opcoes={ESCOLARIDADES} {...campo} />
            <CampoSelect rotulo="Pessoas que moram na residência" nome="pessoasResidencia" opcoes={PESSOAS_RESIDENCIA} placeholderOutro="Quantas?" {...campo} />
            <CampoSelect rotulo="Renda familiar total (aproximada)" obrigatorio nome="rendaFamiliar" opcoes={FAIXAS_RENDA} {...campo} />
          </Secao>

          <Secao numero={2} titulo="Contato de emergência" descricao="Em caso de emergência, ligar para:">
            <CampoTexto rotulo="Nome" obrigatorio nome="emergenciaNome" placeholder="Ex.: José Silva" inteiro {...campo} />
            <CampoTexto rotulo="Telefone" obrigatorio nome="emergenciaTelefone" tipo="tel" placeholder="(85) 99999-9999" {...campo} />
            <CampoSelect rotulo="Grau de parentesco" obrigatorio nome="emergenciaParentesco" opcoes={PARENTESCOS} {...campo} />
          </Secao>

          <Secao numero={3} titulo="Dados do aluno">
            <CampoTexto rotulo="Nome completo do aluno" obrigatorio nome="nomeAluno" placeholder="Ex.: João Silva" inteiro {...campo} />
            <CampoTexto rotulo="Data de nascimento" obrigatorio nome="nascimento" tipo="date" {...campo} />
            <CampoSelect rotulo="Gênero" nome="genero" opcoes={['Masculino', 'Feminino', 'Outro']} placeholderOutro="Como prefere ser identificado?" {...campo} />
            <CampoTexto rotulo="Endereço (rua e número)" obrigatorio nome="endereco" placeholder="Ex.: Rua das Flores, 123" {...campo} />
            <CampoTexto rotulo="Bairro" obrigatorio nome="bairro" placeholder="Ex.: Edson Queiroz" {...campo} />
            <CampoTexto rotulo="CPF ou RG do aluno" nome="cpfAluno" placeholder="000.000.000-00" {...campo} />
          </Secao>

          <Secao numero={4} titulo="Escola e uniforme">
            <CampoSelect rotulo="Tipo de escola" obrigatorio nome="tipoEscola" opcoes={TIPOS_ESCOLA} {...campo} />
            <CampoTexto rotulo="Nome da escola" obrigatorio nome="escola" placeholder="Ex.: Colégio Unifor" {...campo} />
            <CampoSelect rotulo="Série que está cursando" obrigatorio nome="serie" opcoes={SERIES} {...campo} />
            <CampoTexto rotulo="Altura" nome="altura" placeholder="Ex.: 1,45 m" {...campo} />
            <CampoTexto rotulo="Peso" nome="peso" placeholder="Ex.: 40 kg" {...campo} />
            <CampoSelect rotulo="Tamanho do uniforme" obrigatorio nome="tamanhoUniforme" opcoes={TAMANHOS_UNIFORME} {...campo} />
          </Secao>

          <Secao numero={5} titulo="Saúde do aluno">
            <CampoSelect rotulo="Possui plano de saúde?" obrigatorio nome="planoSaude" opcoes={PLANOS_SAUDE} placeholderOutro="Qual plano?" {...campo} />
            <CampoSelect rotulo="Possui plano odontológico?" obrigatorio nome="planoOdonto" opcoes={PLANOS_ODONTO} placeholderOutro="Qual plano?" {...campo} />
            <CampoSelect rotulo="Tipo sanguíneo" nome="tipoSanguineo" opcoes={TIPOS_SANGUINEOS} {...campo} />
            <CampoSelect rotulo="Fator sanguíneo" nome="fatorSanguineo" opcoes={FATORES_SANGUINEOS} {...campo} />
            <CampoSimNao rotulo="É alérgico a algum medicamento?" nome="alergiaMedicamento" rotuloQual="Qual medicamento?" {...campo} />
            <CampoSimNao rotulo="Usa algum medicamento controlado?" nome="medicamentoControlado" rotuloQual="Qual medicamento?" {...campo} />
            <CampoSimNao rotulo="É alérgico a algum alimento?" nome="alergiaAlimento" rotuloQual="Qual alimento?" {...campo} />
            <CampoSimNao rotulo="Necessita de atenção especial?" nome="atencaoEspecial" rotuloQual="Qual atenção?" {...campo} />
            <CampoSelect rotulo="Apresenta algum problema de saúde?" obrigatorio nome="problemaSaude" opcoes={PROBLEMAS_SAUDE} placeholderOutro="Descreva" {...campo} />
            <CampoSelect rotulo="Apresenta algum tipo de deficiência?" obrigatorio nome="deficiencia" opcoes={DEFICIENCIAS} placeholderOutro="Descreva" {...campo} />
          </Secao>

          <div className="d-flex justify-content-end mt-4 mb-5">
            <button type="submit" className="botao-enviar">
              Selecionar Modalidade →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default PreenchimentoDados;
