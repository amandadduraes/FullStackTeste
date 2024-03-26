import React, { createContext, useReducer, useContext } from 'react';

const ClienteContext = createContext();

const ClienteProvider = ({ children }) => {
  const [clientes, dispatch] = useReducer(clienteReducer, []);

  const cadastrarCliente = (novoCliente) => {
    dispatch({ type: 'CADASTRAR_CLIENTE', payload: novoCliente });
  };

  return (
    <ClienteContext.Provider value={{ clientes, cadastrarCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};

const useCliente = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error('useCliente deve ser utilizado dentro de ClienteProvider');
  }
  return context;
};

const clienteReducer = (state, action) => {
  switch (action.type) {
    case 'CADASTRAR_CLIENTE':
      return [...state, action.payload];
    default:
      return state;
  }
};

export { ClienteProvider, useCliente };