import React from 'react';
import './Menu.css';

const Menu = ({ onToggle }) => {
  return (
    <div className="menu-container">
      <button className="menu-button" onClick={() => onToggle('listagem')}>
        Listagem de Categorias
      </button>
      <button className="menu-button" onClick={() => onToggle('cadastro')}>
        Cadastro de Categorias
      </button>
    </div>
  );
};

export default Menu;
