import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';
import { CampoOpcoes, CampoSelect, CampoSimNao } from './CamposInscricao';
import {
  DEFICIENCIAS, ESCOLARIDADES, FAIXAS_RENDA, FATORES_SANGUINEOS, PARENTESCOS, PESSOAS_RESIDENCIA, PLANOS_ODONTO,
  PLANOS_SAUDE, PROBLEMAS_SAUDE, SERIES, TAMANHOS_UNIFORME, TIPOS_ESCOLA, TIPOS_SANGUINEOS,
} from './opcoesInscricao';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const CINZA_CLARO = '#F3F4F6';
const CINZA_BORDA = '#D1D5DB';

function PreenchimentoDados() {
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState([
    {
      id: 1,
      nome: 'Certidão ou RG do aluno',
      arquivo: 'certidao_carolina.pdf',
      obrigatorio: true,
      anexado: true,
    },
    {
      id: 2,
      nome: 'Documento do responsável',
      arquivo: null,
      obrigatorio: true,
      anexado: false,
    },
    {
      id: 3,
      nome: 'Comprovante de residência',
      arquivo: null,
      obrigatorio: true,
      anexado: false,
    },
  ]);

  const [formData, setFormData] = useState({
    nomeAluno: '',
    nascimento: '',
    genero: '',
    cpfAluno: '',
    endereco: '',
    bairro: '',
    tipoEscola: '',
    escola: '',
    serie: '',
    altura: '',
    peso: '',
    tamanhoUniforme: '',
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
    emergenciaNome: '',
    emergenciaTelefone: '',
    emergenciaParentesco: '',
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

  const [dragActive, setDragActive] = useState(false);

  // Manipular mudanças de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manipular drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Manipular seleção de arquivo
  const handleFileChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    // Aqui você implementaria a lógica de upload
    console.log('Arquivos recebidos:', files);
  };

  const handleRemoverDocumento = (id) => {
    setDocumentos(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, arquivo: null, anexado: false } : doc
      )
    );
  };

  const handleAnexarDocumento = (id) => {
    // Aqui você implementaria a lógica de anexar arquivo
    console.log('Anexar documento:', id);
  };

  const handleEnviar = () => {
    console.log('Dados para envio:', formData);
    // Aqui você faria a chamada da API
    navigate('/inscricao');
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
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
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .botao-voltar:hover {
          color: ${AZUL};
        }

        .secao-titulo {
          color: ${AZUL};
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          line-height: 1.3;
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

        .campo-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid ${CINZA_BORDA};
          border-radius: 6px;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          color: ${AZUL_ESCURO};
          transition: border-color 0.3s ease;
          background-color: #FFFFFF;
        }

        .campo-input::placeholder {
          color: #9CA3AF;
        }

        .campo-input:focus {
          outline: none;
          border-color: ${AZUL};
          box-shadow: 0 0 0 3px rgba(0, 71, 184, 0.1);
        }

        .campo-select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid ${CINZA_BORDA};
          border-radius: 6px;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          color: ${AZUL_ESCURO};
          background-color: #FFFFFF;
          cursor: pointer;
          transition: border-color 0.3s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239CA3AF' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 30px;
        }

        .campo-select:focus {
          outline: none;
          border-color: ${AZUL};
          box-shadow: 0 0 0 3px rgba(0, 71, 184, 0.1);
        }

        .caixa-grupo-campos {
          margin-bottom: 1.5rem;
        }

        .grupo-opcoes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
        }

        .opcao {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: ${AZUL_ESCURO};
          cursor: pointer;
        }

        .opcao input {
          width: 16px;
          height: 16px;
          accent-color: ${AZUL};
          cursor: pointer;
        }

        .secao-saude {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid ${CINZA_BORDA};
        }

        .grade-saude {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .grade-saude { grid-template-columns: 1fr; }
        }

        .subsecao-titulo {
          font-size: 0.9rem;
          font-weight: 600;
          color: ${AZUL_ESCURO};
          margin: 1.5rem 0 0.75rem;
        }

        .aviso-info {
          background-color: #EFF6FF;
          border-left: 4px solid ${AZUL};
          padding: 12px;
          border-radius: 4px;
          margin-top: 1rem;
        }

        .aviso-info-texto {
          color: ${AZUL_ESCURO};
          font-size: 0.85rem;
          line-height: 1.5;
          display: flex;
          gap: 8px;
        }

        .aviso-icone {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          background-color: ${AZUL};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .area-upload {
          border: 2px dashed #B0C4DE;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: #F8FBFF;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .area-upload.ativa {
          background-color: #EFF6FF;
          border-color: ${AZUL};
        }

        .upload-icone {
          color: ${AZUL};
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .upload-texto-principal {
          color: ${AZUL};
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .upload-texto-secundario {
          color: #6B7280;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .upload-restricao {
          color: #9CA3AF;
          font-size: 0.8rem;
        }

        .input-file-hidden {
          display: none;
        }

        .lista-documentos {
          margin-top: 1.5rem;
        }

        .item-documento {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background-color: ${CINZA_CLARO};
          border-radius: 6px;
          margin-bottom: 0.75rem;
          border-left: 4px solid #10B981;
        }

        .item-documento.nao-anexado {
          border-left-color: #F3F4F6;
        }

        .documento-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-grow: 1;
        }

        .documento-icone {
          font-size: 1.5rem;
          color: #6B7280;
        }

        .documento-detalhes {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .documento-nome {
          color: ${AZUL_ESCURO};
          font-size: 0.9rem;
          font-weight: 500;
        }

        .documento-obrigatorio {
          color: #EF4444;
          font-size: 0.75rem;
        }

        .documento-arquivo {
          color: #6B7280;
          font-size: 0.8rem;
        }

        .documento-acoes {
          display: flex;
          gap: 10px;
        }

        .link-acao {
          color: ${AZUL};
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          border: none;
          background: none;
          padding: 0;
          transition: color 0.3s ease;
        }

        .link-acao:hover {
          color: ${AZUL_ESCURO};
        }

        .link-acao.remover {
          color: #EF4444;
        }

        .link-acao.remover:hover {
          color: #DC2626;
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
          min-width: 200px;
        }

        .botao-enviar:hover {
          background-color: #0039A0;
        }

        .coluna-documentos {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 1024px) {
          .container-colunas {
            flex-direction: column;
          }

          .coluna {
            margin-bottom: 2rem;
          }
        }
      `}</style>

      <HeaderPublico />

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 w-100 py-4 px-3 px-lg-5" style={{ maxWidth: '100%' }}>
        <div className="container-fluid" style={{ maxWidth: '100%', margin: '0 auto', padding: '0' }}>
          {/* Botão Voltar */}
          <button
            onClick={() => navigate('/')}
            className="botao-voltar mb-4"
          >
            <span>←</span>
            Voltar
          </button>

          {/* Título e Descrição */}
          <div className="mb-4">
            <h1
              style={{
                color: AZUL_ESCURO,
                fontSize: '2rem',
                fontWeight: '600',
                lineHeight: '1.2',
                marginBottom: '0.3rem',
              }}
            >
              Dados para inscrição
            </h1>
            <p
              style={{
                color: '#6B7280',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                marginBottom: 0,
              }}
            >
              Preencha as informações abaixo e anexe os documentos para entrar na lista de espera.
            </p>
          </div>

          {/* Container com 3 colunas */}
          <div className="container-colunas" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            {/* COLUNA 1: Dados do Aluno */}
            <div className="coluna" style={{ flex: 1, minWidth: 0 }}>
              <div className="secao-titulo">Dados do aluno</div>

              {/* Nome Completo do Aluno */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Nome completo do aluno</label>
                <input
                  type="text"
                  name="nomeAluno"
                  value={formData.nomeAluno}
                  onChange={handleInputChange}
                  placeholder="Ex.: João Silva"
                  className="campo-input"
                />
              </div>

              {/* Nascimento e Gênero */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="label-campo label-obrigatorio">Nascimento</label>
                  <input
                    type="text"
                    name="nascimento"
                    value={formData.nascimento}
                    onChange={handleInputChange}
                    placeholder="dd/mm/aaaa"
                    className="campo-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label-campo">Gênero</label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    className="campo-select"
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>


              {/* CPF ou RG do aluno (opcional, como no formulário) */}
              <div className="caixa-grupo-campos">
                <label className="label-campo">CPF ou RG do aluno</label>
                <input
                  type="text"
                  name="cpfAluno"
                  value={formData.cpfAluno}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  className="campo-input"
                />
              </div>

              {/* Endereço */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Endereço (rua e número)</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  placeholder="Ex.: Rua das Flores, 123"
                  className="campo-input"
                />
              </div>
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Bairro</label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleInputChange}
                  placeholder="Ex.: Edson Queiroz"
                  className="campo-input"
                />
              </div>

              {/* Escola */}
              <CampoOpcoes rotulo="Cursa a educação básica em que tipo de escola?" obrigatorio nome="tipoEscola" opcoes={TIPOS_ESCOLA} dados={formData} onChange={handleInputChange} emLinha />
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Nome da escola</label>
                <input
                  type="text"
                  name="escola"
                  value={formData.escola}
                  onChange={handleInputChange}
                  placeholder="Ex.: Colégio Unifor"
                  className="campo-input"
                />
              </div>
              <CampoSelect rotulo="Série que está cursando" obrigatorio nome="serie" opcoes={SERIES} dados={formData} onChange={handleInputChange} />

              {/* Medidas e uniforme */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="label-campo">Altura</label>
                  <input
                    type="text"
                    name="altura"
                    value={formData.altura}
                    onChange={handleInputChange}
                    placeholder="Ex.: 1,45 m"
                    className="campo-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label-campo">Peso</label>
                  <input
                    type="text"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                    placeholder="Ex.: 40 kg"
                    className="campo-input"
                  />
                </div>
              </div>
              <CampoSelect rotulo="Tamanho do uniforme" obrigatorio nome="tamanhoUniforme" opcoes={TAMANHOS_UNIFORME} dados={formData} onChange={handleInputChange} />
            </div>

            {/* COLUNA 2: Dados do Responsável */}
            <div className="coluna" style={{ flex: 1, minWidth: 0 }}>
              <div className="secao-titulo">Dados do responsável</div>

              {/* Nome Completo do Responsável */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Nome completo</label>
                <input
                  type="text"
                  name="nomeResponsavel"
                  value={formData.nomeResponsavel}
                  onChange={handleInputChange}
                  placeholder="Ex.: Maria Silva"
                  className="campo-input"
                />
              </div>

              {/* CPF do Responsável (usado para acompanhar a inscrição) */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">CPF do responsável</label>
                <input
                  type="text"
                  name="cpfResponsavel"
                  value={formData.cpfResponsavel}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  className="campo-input"
                />
              </div>

              {/* Telefone */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(85) 99999-9999"
                  className="campo-input"
                />
              </div>

              {/* E-mail */}
              <div className="caixa-grupo-campos">
                <label className="label-campo">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ex.: maria@email.com"
                  className="campo-input"
                />
              </div>

              <CampoOpcoes rotulo="Grau de parentesco com o aluno" obrigatorio nome="parentesco" opcoes={PARENTESCOS} dados={formData} onChange={handleInputChange} emLinha />
              <CampoOpcoes rotulo="Qual o grau de escolaridade do responsável?" obrigatorio nome="escolaridade" opcoes={ESCOLARIDADES} dados={formData} onChange={handleInputChange} />
              <CampoOpcoes rotulo="Quantas pessoas moram na residência?" nome="pessoasResidencia" opcoes={PESSOAS_RESIDENCIA} dados={formData} onChange={handleInputChange} placeholderOutro="Quantas?" />
              <CampoOpcoes rotulo="Aproximadamente qual o total da renda familiar da residência?" obrigatorio nome="rendaFamiliar" opcoes={FAIXAS_RENDA} dados={formData} onChange={handleInputChange} />

              {/* Contato de emergência */}
              <div className="subsecao-titulo">Em caso de emergência, ligar para:</div>
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Nome</label>
                <input
                  type="text"
                  name="emergenciaNome"
                  value={formData.emergenciaNome}
                  onChange={handleInputChange}
                  placeholder="Ex.: José Silva"
                  className="campo-input"
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="label-campo label-obrigatorio">Telefone</label>
                  <input
                    type="tel"
                    name="emergenciaTelefone"
                    value={formData.emergenciaTelefone}
                    onChange={handleInputChange}
                    placeholder="(85) 99999-9999"
                    className="campo-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label-campo label-obrigatorio">Grau de parentesco</label>
                  <select
                    name="emergenciaParentesco"
                    value={formData.emergenciaParentesco}
                    onChange={handleInputChange}
                    className="campo-select"
                  >
                    <option value="">Selecione</option>
                    {PARENTESCOS.map((parentesco) => (
                      <option key={parentesco} value={parentesco}>{parentesco}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Aviso CPF */}
              <div className="aviso-info">
                <div className="aviso-info-texto">
                  <div className="aviso-icone">i</div>
                  <span>O CPF do responsável será usado para acompanhar a inscrição.</span>
                </div>
              </div>
            </div>

            {/* COLUNA 3: Documentos */}
            <div className="coluna coluna-documentos" style={{ flex: 1, minWidth: 0 }}>
              <div className="secao-titulo">Documentos</div>

              {/* Área de Upload */}
              <div
                className={`area-upload ${dragActive ? 'ativa' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('input-arquivo').click()}
              >
                <div className="upload-icone">☁</div>
                <div className="upload-texto-principal">Arraste aqui ou <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>clique para anexar</span></div>
                <div className="upload-texto-secundario">PDF, JPG ou PNG - até 5 MB</div>
              </div>

              <input
                id="input-arquivo"
                type="file"
                multiple
                className="input-file-hidden"
                onChange={handleFileChange}
              />

              {/* Lista de Documentos */}
              <div className="lista-documentos">
                {documentos.map((doc) => (
                  <div
                    key={doc.id}
                    className={`item-documento ${!doc.anexado ? 'nao-anexado' : ''}`}
                  >
                    <div className="documento-info">
                      <div className="documento-icone">📄</div>
                      <div className="documento-detalhes">
                        <div className="documento-nome">
                          {doc.nome}
                          {doc.obrigatorio && <span className="documento-obrigatorio"> *</span>}
                        </div>
                        {doc.arquivo && (
                          <div className="documento-arquivo">{doc.arquivo}</div>
                        )}
                      </div>
                    </div>
                    <div className="documento-acoes">
                      {doc.anexado ? (
                        <button
                          type="button"
                          onClick={() => handleRemoverDocumento(doc.id)}
                          className="link-acao remover"
                        >
                          Remover
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAnexarDocumento(doc.id)}
                          className="link-acao"
                        >
                          Anexar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Saúde do aluno */}
          <div className="secao-saude">
            <div className="secao-titulo">Saúde do aluno</div>
            <div className="grade-saude">
              <div>
                <CampoSelect rotulo="Possui plano de saúde?" obrigatorio nome="planoSaude" opcoes={PLANOS_SAUDE} dados={formData} onChange={handleInputChange} />
                {formData.planoSaude === 'Outro' && (
                  <input type="text" name="planoSaudeOutro" value={formData.planoSaudeOutro} onChange={handleInputChange} placeholder="Qual plano?" className="campo-input mb-4" />
                )}
                <CampoSelect rotulo="Possui plano odontológico?" obrigatorio nome="planoOdonto" opcoes={PLANOS_ODONTO} dados={formData} onChange={handleInputChange} />
                {formData.planoOdonto === 'Outro' && (
                  <input type="text" name="planoOdontoOutro" value={formData.planoOdontoOutro} onChange={handleInputChange} placeholder="Qual plano?" className="campo-input mb-4" />
                )}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <CampoSelect rotulo="Tipo sanguíneo" nome="tipoSanguineo" opcoes={TIPOS_SANGUINEOS} dados={formData} onChange={handleInputChange} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <CampoSelect rotulo="Fator sanguíneo" nome="fatorSanguineo" opcoes={FATORES_SANGUINEOS} dados={formData} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div>
                <CampoSimNao rotulo="É alérgico a algum medicamento?" nome="alergiaMedicamento" dados={formData} onChange={handleInputChange} rotuloQual="Qual medicamento?" />
                <CampoSimNao rotulo="Usa algum medicamento controlado?" nome="medicamentoControlado" dados={formData} onChange={handleInputChange} rotuloQual="Qual medicamento?" />
                <CampoSimNao rotulo="É alérgico a algum alimento?" nome="alergiaAlimento" dados={formData} onChange={handleInputChange} rotuloQual="Qual alimento?" />
                <CampoSimNao rotulo="Necessita de atenção especial?" nome="atencaoEspecial" dados={formData} onChange={handleInputChange} rotuloQual="Qual atenção?" />
              </div>

              <div>
                <CampoOpcoes rotulo="Apresenta algum problema de saúde?" obrigatorio nome="problemaSaude" opcoes={PROBLEMAS_SAUDE} dados={formData} onChange={handleInputChange} placeholderOutro="Descreva" />
                <CampoOpcoes rotulo="Apresenta algum tipo de deficiência?" obrigatorio nome="deficiencia" opcoes={DEFICIENCIAS} dados={formData} onChange={handleInputChange} placeholderOutro="Descreva" />
              </div>
            </div>
          </div>

          {/* Botão Enviar */}
          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              onClick={handleEnviar}
              className="botao-enviar"
            >
              Selecionar Modalidade
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PreenchimentoDados;