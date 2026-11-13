import { useEffect, useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useCarregar } from '../../hooks/useCarregar';
import { listarInscricoes, sincronizarPosicoes } from '../../services/inscricoes';
import { MODALIDADES } from '../../services/turmas';
import { calcularIdade, formatarData } from '../../utils/datas';
import { CabecalhoPagina, CampoBusca, Etiqueta, LinkDetalhes, RodapeTabela } from './componentes';
import { normalizar } from '../../utils/texto';
import { usePaginacao } from './usePaginacao';

const filtrosVazios = { busca: '', modalidade: 'Todas', faixa: 'Todas', status: 'Aguardando vaga' };

// Faixas etárias do filtro: [rótulo, idade mínima, idade máxima]
const FAIXAS = [['6 a 9 anos', 6, 9], ['10 a 13 anos', 10, 13], ['14 a 17 anos', 14, 17]];
const STATUS = ['Aguardando vaga', 'Convocado', 'Matriculado', 'Cancelada'];


function ListaEspera() {
  const [filtros, setFiltros] = useState(filtrosVazios);
  const [aplicados, setAplicados] = useState(filtrosVazios);
  const { dados: inscricoes, carregando, erro, recarregar } = useCarregar(listarInscricoes);

  // Mantém a posição que o responsável vê na consulta igual à posição calculada aqui
  useEffect(() => {
    if (inscricoes) sincronizarPosicoes(inscricoes).catch((e) => console.error('Erro ao atualizar posições:', e));
  }, [inscricoes]);

  const alterar = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value });
  const faixa = FAIXAS.find(([rotulo]) => rotulo === aplicados.faixa);

  const filtradas = (inscricoes || [])
    .map((inscricao) => ({ ...inscricao, idade: calcularIdade(inscricao.nascimento) }))
    .filter((inscricao) =>
      normalizar(inscricao.nomeAluno || '').includes(normalizar(aplicados.busca)) &&
      (aplicados.modalidade === 'Todas' || inscricao.modalidade === aplicados.modalidade) &&
      (!faixa || (inscricao.idade >= faixa[1] && inscricao.idade <= faixa[2])) &&
      (aplicados.status === 'Todos' || inscricao.status === aplicados.status)
    );

  const paginacao = usePaginacao(filtradas);

  return (
    <LayoutAdmin titulo="Lista de espera">
      <CabecalhoPagina titulo="Lista de espera" subtitulo="Confira os alunos que aguardam vagas nas turmas." />

      {/* Filtros */}
      <form
        className="painel-card row g-3 align-items-end mx-0 px-2 pb-3 mb-4"
        onSubmit={(e) => { e.preventDefault(); setAplicados(filtros); paginacao.setPagina(1); }}
      >
        <div className="col-12 col-md-3">
          <CampoBusca rotulo="Nome do aluno" placeholder="Buscar por nome..." valor={filtros.busca} onChange={alterar} />
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Modalidade</label>
          <select name="modalidade" className="form-select form-select-sm admin-campo" value={filtros.modalidade} onChange={alterar}>
            <option>Todas</option>
            {MODALIDADES.map((modalidade) => <option key={modalidade}>{modalidade}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Faixa etária</label>
          <select name="faixa" className="form-select form-select-sm admin-campo" value={filtros.faixa} onChange={alterar}>
            <option>Todas</option>
            {FAIXAS.map(([rotulo]) => <option key={rotulo}>{rotulo}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Status</label>
          <select name="status" className="form-select form-select-sm admin-campo" value={filtros.status} onChange={alterar}>
            <option>Todos</option>
            {STATUS.map((status) => <option key={status}>{status}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-2 ms-auto">
          <button type="submit" className="admin-botao-filtrar">Filtrar</button>
        </div>
      </form>

      <div className="painel-card p-3 d-flex flex-column" style={{ minHeight: '360px' }}>
        {carregando && <Carregando />}
        {erro && <ErroCarga onTentarDeNovo={recarregar} />}
        {inscricoes && (
          <>
            <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '0.95rem' }}>
              Total de {filtradas.length} inscrições
            </h2>
            {filtradas.length === 0 ? (
              <Vazio texto="Nenhuma inscrição encontrada com esses filtros." />
            ) : (
              <div className="table-responsive">
                <table className="admin-tabela">
                  <thead>
                    <tr>
                      <th>Nome do aluno</th>
                      <th>Idade</th>
                      <th>Modalidade</th>
                      <th>Responsável</th>
                      <th>Data de inscrição</th>
                      <th className="text-center">Posição</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginacao.itensDaPagina.map((inscricao) => (
                      <tr key={inscricao.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                        <td>{inscricao.nomeAluno}</td>
                        <td>{inscricao.idade ?? '—'}</td>
                        <td>{inscricao.modalidade}</td>
                        <td>{inscricao.nomeResponsavel}</td>
                        <td>{formatarData(inscricao.criadoEm)}</td>
                        <td className="text-center">{inscricao.posicaoCalculada ?? '—'}</td>
                        <td><Etiqueta texto={inscricao.status} /></td>
                        <td>
                          <LinkDetalhes to={`/admin/lista-espera/${inscricao.id}`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <RodapeTabela paginacao={paginacao} />
          </>
        )}
      </div>
    </LayoutAdmin>
  );
}

export default ListaEspera;
