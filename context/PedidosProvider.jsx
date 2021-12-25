// los context son como los services de Angular
import { createContext, useState } from "react";

export const PedidosContext = createContext();

const PedidosProvider = ({ children }) => {
  const initialState = {
    cliente: [],
    productos: [],
    total: 0,
  };

  const [state, setState] = useState(initialState);

  const addClient = (cliente) => {
    setState({
      ...state,
      cliente: cliente,
    });
  };

  const addProduct = (producto) => {
    setState({
      ...state,
      productos: producto,
    });
  };

  return (
    <PedidosContext.Provider
      value={{ addClient, addProduct, productos: state.productos }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export default PedidosProvider;
