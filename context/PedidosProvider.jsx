// los context son como los services de Angular
import { createContext, useReducer } from "react";

export const PedidosContext = createContext();

const PedidosProvider = ({ children }) => {
  const initialState = {
    cliente: [],
    productos: [],
    total: 0,
  };

  return (
    <PedidosContext.Provider value={{}}>{children}</PedidosContext.Provider>
  );
};

export default PedidosProvider;
