import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { AZUL_TITULO } from '../../components/cores';
import { Etiqueta } from './componentes';
import { buscarPorId, listaEspera, linkWhatsApp } from './dados';

// Cartão com ícone, título e botão "Editar" opcional
function CardSecao({ icone, titulo, editavel, children }) {
  return (
    <div className="painel-card p-3 h-100">
      <div className="d-flex align-items-center gap-2 mb-3">
        <i className={`bi ${icone} fs-5`} style={{ color: AZUL_TITULO }}></i>
        <h2 className="fw-semibold m-0 flex-grow-1" style={{ color: AZUL_TITULO, fontSize: '0.9rem' }}>{titulo}</h2>
        {editavel && <button type="button" className="admin-botao-contorno py-0 px-3" style={{ fontSize: '0.75rem' }}>Editar</button>}
      </div>
      {children}
    </div>
  );
}

function Linha({ rotulo, children }) {
  return (
    <div className="row mb-1" style={{ fontSize: '0.7rem' }}>
      <div className="col-5" style={{ color: '#4B5563' }}>{rotulo}</div>
      <div className="col-7" style={{ color: '#374151' }}>{children}</div>
    </div>
  );
}

// Etapas da inscrição na linha do tempo
const etapas = [
  ['Inscrição realizada', 'Inscrição incluída na lista de espera.'],
  ['Aguardando vaga', 'Aguardando surgimento de vaga.'],
  ['Convocação', 'Será exibida quando o responsável for convocado.'],
];

function DetalhesListaEspera() {
  const { inscricaoId } = useParams();
  const navigate = useNavigate();
  const inscricao = buscarPorId(listaEspera, inscricaoId);
  const [convocado, setConvocado] = useState(inscricao.status === 'Convocado');
  const [documentos, setDocumentos] = useState(['Comprovante de residência', 'Documento do responsável', 'Atestado médico']);
  const inputArquivo = useRef(null);

  const telefone = '(85) 98765-4321';
  // Etapas concluídas: inscrição sempre; convocação só depois de convocar
  const etapaAtual = convocado ? 2 : 0;

  return (
    <LayoutAdmin titulo="Lista de espera">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div>
          <Link to="/admin/lista-espera" className="text-decoration-none" style={{ color: '#0B6BC2', fontSize: '0.7rem' }}>
            <i className="bi bi-arrow-left me-1"></i>Voltar para a lista de espera
          </Link>
          <h1 className="admin-titulo" style={{ fontSize: '1.5rem' }}>Detalhes da inscrição</h1>
        </div>

        <div className="d-flex gap-3">
          <div className="d-flex align-items-center gap-2 rounded px-3 py-1" style={{ backgroundColor: convocado ? '#BBF7D0' : '#D7F5D7', color: '#15803D', fontSize: '0.75rem' }}>
            <i className="bi bi-clock"></i>
            <div>
              {convocado ? 'Convocado' : 'Aguardando vaga'}
              {!convocado && <div style={{ fontSize: '0.65rem' }}>Posição na fila: {inscricao.posicao}</div>}
            </div>
          </div>
          <button type="button" className="admin-botao" disabled={convocado} onClick={() => setConvocado(true)}>
            <i className="bi bi-megaphone"></i> Convocar responsável
          </button>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-person" titulo="Dados do aluno" editavel>
            <Linha rotulo="Nome completo">{inscricao.nome}</Linha>
            <Linha rotulo="Data de nascimento">12/05/2015</Linha>
            <Linha rotulo="CPF">123.456.789-10</Linha>
            <Linha rotulo="Sexo">Feminino</Linha>
          </CardSecao>
        </div>
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-person" titulo="Dados do responsável" editavel>
            <Linha rotulo="Nome completo">Mariana Silva Oliveira</Linha>
            <Linha rotulo="Parentesco">Mãe</Linha>
            <Linha rotulo="Telefone">{telefone}</Linha>
            <Linha rotulo="E-mail">mariana@gmail.com</Linha>
            <Linha rotulo="CPF">098.765.432-10</Linha>
          </CardSecao>
        </div>
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-dribbble" titulo="Modalidade e turma solicitada" editavel>
            <Linha rotulo="Modalidade">{inscricao.modalidade}</Linha>
            <Linha rotulo="Turma">{inscricao.modalidade} - {inscricao.turma}</Linha>
            <Linha rotulo="Faixa etária da turma">10 a 14 anos</Linha>
            <Linha rotulo="Horário">15h às 16h</Linha>
            <Linha rotulo="Local">Ginásio</Linha>
            <Linha rotulo="Professor">Karine</Linha>
          </CardSecao>
        </div>
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-file-earmark-text" titulo="Informações da inscrição">
            <Linha rotulo="Data da inscrição">{inscricao.dataInscricao} às 10:32</Linha>
            <Linha rotulo="Forma de inscrição">Online (site)</Linha>
            <Linha rotulo="Situação"><Etiqueta texto={convocado ? 'Convocado' : 'Aguardando vaga'} cor="verde" /></Linha>
            <Linha rotulo="Posição na fila">{inscricao.posicao}</Linha>
            <Linha rotulo="Observações">-</Linha>
          </CardSecao>
        </div>
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-paperclip" titulo="Documentos e informações adicionais">
            {documentos.map((documento) => (
              <div key={documento} className="d-flex align-items-center mb-2" style={{ fontSize: '0.7rem' }}>
                <span className="flex-grow-1" style={{ color: '#4B5563' }}>{documento}</span>
                <span className="me-4" style={{ color: '#374151', width: '70px' }}>
                  <i className="bi bi-check-circle-fill me-1" style={{ color: '#16A34A' }}></i>Enviado
                </span>
                <button type="button" className="btn btn-link p-0" style={{ fontSize: '0.7rem', color: '#0B6BC2' }}>Visualizar</button>
              </div>
            ))}
            <div className="text-end">
              <input ref={inputArquivo} type="file" className="d-none" onChange={(e) => e.target.files[0] && setDocumentos([...documentos, e.target.files[0].name])} />
              <button type="button" className="btn btn-sm" style={{ backgroundColor: '#BFDDF3', color: '#0B6BC2', fontSize: '0.7rem' }} onClick={() => inputArquivo.current.click()}>
                <i className="bi bi-file-earmark-plus me-1"></i>Adicionar documento
              </button>
            </div>
          </CardSecao>
        </div>
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-clock-history" titulo="Histórico da inscrição">
            {etapas.map(([titulo, descricao], indice) => (
              <div key={titulo} className="d-flex gap-2 mb-2">
                <i className={`bi ${indice <= etapaAtual ? 'bi-circle-fill' : 'bi-circle'}`} style={{ color: '#0B6BC2', fontSize: '0.7rem' }}></i>
                <div>
                  <div className="fw-medium" style={{ color: AZUL_TITULO, fontSize: '0.7rem' }}>{titulo}</div>
                  <div style={{ color: '#6B7280', fontSize: '0.6rem' }}>{descricao}</div>
                </div>
              </div>
            ))}
          </CardSecao>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-between gap-3">
        <button
          type="button"
          className="btn d-flex align-items-center gap-2"
          style={{ border: '1px solid #F87171', color: '#DC2626', backgroundColor: '#FFFFFF', fontSize: '0.8rem' }}
          onClick={() => navigate('/admin/lista-espera')}
        >
          <i className="bi bi-trash"></i> Cancelar inscrição
        </button>
        <div className="d-flex gap-3">
          <a href={linkWhatsApp(telefone)} target="_blank" rel="noreferrer" className="admin-botao" style={{ backgroundColor: '#4CD964' }}>
            <i className="bi bi-whatsapp"></i> Abrir WhatsApp
          </a>
          <button type="button" className="admin-botao" onClick={() => navigate('/admin/alunos')}>
            <i className="bi bi-check-lg"></i> Finalizar matrícula
          </button>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default DetalhesListaEspera;
