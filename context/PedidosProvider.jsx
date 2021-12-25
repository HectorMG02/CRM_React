// los context son como los services de Angular
import { createContext, useReducer, useState, setState } from "react";

export const PedidosContext = createContext();

const PedidosProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  const initialState = {
    cliente: [],
    productos: [],
    total: 0,
  };

  const addClient = (cliente) => {
    setClientes({ ...clientes, cliente });
  };

  const addProduct = (producto) => {
    setProductos({ ...productos, producto });
  };

  return (
    <PedidosContext.Provider value={{ addClient, addProduct }}>
      {children}
    </PedidosContext.Provider>
  );
};

export default PedidosProvider;
