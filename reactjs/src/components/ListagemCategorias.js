import React, { useState, useEffect } from 'react';
import './ListagemCategorias.css';

const ListagemCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState('codigo');
  const [editando, setEditando] = useState(false);
  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [ordenacao, setOrdenacao] = useState({
    coluna: 'codigo',
    ordem: 'asc', // ou 'desc'
  });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3003/categorias');
      const data = await response.json();
      setCategorias(data);
      setCategoriasFiltradas(data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleFiltrar = () => {
    const categoriasFiltradas = categorias.filter((categoria) =>
      String(categoria[filtroSelecionado]).toLowerCase().includes(filtro.toLowerCase())
    );
    setCategoriasFiltradas(categoriasFiltradas);
  };

  const handleChangeFiltro = (event) => {
    setFiltroSelecionado(event.target.value);
  };

  const handleEditar = (categoria) => {
    setCategoriaEditada(categoria);
    setEditando(true);
  };

  const handleCancelarEdicao = () => {
    setCategoriaEditada(null);
    setEditando(false);
  };

  const handleExcluir = async (id) => {
    try {
      const response = await fetch(`http://localhost:3003/categorias/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Categoria excluída com sucesso');
        fetchCategorias();
      } else {
        console.error('Erro ao excluir categoria');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleSalvarEdicao = async () => {
    try {
      const response = await fetch(`http://localhost:3003/categorias/${categoriaEditada.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoriaEditada)
      });
      if (response.ok) {
        console.log('Categoria atualizada com sucesso');
        fetchCategorias();
        setCategoriaEditada(null);
        setEditando(false);
      } else {
        console.error('Erro ao atualizar categoria');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleOrdenar = (coluna) => {
    const isAsc = ordenacao.coluna === coluna && ordenacao.ordem === 'asc';
    const novaOrdem = isAsc ? 'desc' : 'asc';
    setOrdenacao({ coluna: coluna, ordem: novaOrdem });

    const categoriasOrdenadas = [...categoriasFiltradas].sort((a, b) => {
      if (novaOrdem === 'asc') {
        return a[coluna] > b[coluna] ? 1 : -1;
      } else {
        return a[coluna] < b[coluna] ? 1 : -1;
      }
    });
    setCategoriasFiltradas(categoriasOrdenadas);
  };

  return (
    <div className="filtro-container">
      <h2>Listagem de Categorias</h2>
      <div>
        <label>
          Filtro:
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </label>
        <label>
          Filtrar por:
          <select value={filtroSelecionado} onChange={handleChangeFiltro}>
            <option value="codigo">Código</option>
            <option value="titulo">Título</option>
            <option value="descricao">Descrição</option>
          </select>
        </label>
        <button onClick={handleFiltrar}>Filtrar</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleOrdenar('codigo')}>Código</th>
              <th onClick={() => handleOrdenar('titulo')}>Título</th>
              <th onClick={() => handleOrdenar('descricao')}>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categoriasFiltradas.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.codigo}</td>
                <td>{categoria.titulo}</td>
                <td>{categoria.descricao}</td>
                <td>
                  <button onClick={() => handleEditar(categoria)}>
                    Editar
                  </button>
                  <button onClick={() => handleExcluir(categoria.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editando && (
        <div>
          <h3>Editar Categoria</h3>
          <input
            type="text"
            value={categoriaEditada?.titulo || ""}
            onChange={(e) =>
              setCategoriaEditada({
                ...categoriaEditada,
                titulo: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={categoriaEditada?.descricao || ""}
            onChange={(e) =>
              setCategoriaEditada({
                ...categoriaEditada,
                descricao: e.target.value,
              })
            }
          />
          <button onClick={handleSalvarEdicao}>Salvar</button>
          <button onClick={handleCancelarEdicao}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default ListagemCategorias;
