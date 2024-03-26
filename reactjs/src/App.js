import React, { useEffect, useState } from 'react';
import ListagemCategorias from './components/ListagemCategorias'; 
import CadastroCategorias from './components/CadastroCategorias'; 
import Menu from './components/Menu';
import './App.css';

const App = () => {
  const [categorias, setCategorias] = useState([]); 
  const [mostrarListagem, setMostrarListagem] = useState(true);

  useEffect(() => {
    fetchCategorias(); 
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3003/categorias'); 
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const cadastrarCategoria = async (categoria) => {
    try {
      const response = await fetch('http://localhost:3003/categorias', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
      });

      if (response.ok) {
        console.log('Categoria cadastrada com sucesso!');
        fetchCategorias(); 
      } else {
        console.error('Erro ao cadastrar categoria');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const toggleComponente = (componente) => {
    if (componente === 'listagem') {
      setMostrarListagem(true);
    } else if (componente === 'cadastro') {
      setMostrarListagem(false);
    }
  };

  return (
    <div>
      <Menu onToggle={toggleComponente} />
      <div className="app-container">
        {mostrarListagem ? (
          <ListagemCategorias categorias={categorias} /> 
        ) : (
          <CadastroCategorias onCadastrarCategoria={cadastrarCategoria} /> 
        )}
      </div>
    </div>
  );
};

export default App;
