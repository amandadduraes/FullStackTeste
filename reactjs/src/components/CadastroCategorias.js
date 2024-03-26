import React, { useState } from 'react';
import './CadastroCategorias.css';

const CadastroCategorias = ({ onCadastrarCategoria }) => {
  const [codigo, setCodigo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [aviso, setAviso] = useState('');

  const handleCadastrarCategoria = async () => {
    if (!codigo || !titulo || !descricao) {
      setAviso('Por favor, preencha todos os campos');
      return;
    }

    const categoria = {
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
    };

    try {
      await onCadastrarCategoria(categoria);
      setCodigo('');
      setTitulo('');
      setDescricao('');
      setAviso(''); 
    } catch (error) {
      console.error('Erro ao cadastrar categoria:', error);
    }
  };

  return (
    <div className="cadastro-categorias-container">
      <h2>Cadastro de Categorias</h2>
      {aviso && <div className="aviso">{aviso}</div>}
      <label>
        Código:
        <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
      </label>
      <label>
        Título:
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </label>
      <label>
        Descrição:
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </label>
      <button onClick={handleCadastrarCategoria}>Cadastrar Categoria</button>
    </div>
  );
};

export default CadastroCategorias;
