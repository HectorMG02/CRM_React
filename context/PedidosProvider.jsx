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

  const cantidadProducto = (nuevoProducto) => {
    const productos = [...state.productos];
    const index = productos.findIndex(
      (producto) => producto.id === nuevoProducto.id
    );
    productos[index] = nuevoProducto;
    setState({
      ...state,
      productos,
    });
  };

  return (
    <PedidosContext.Provider
      value={{
        addClient,
        addProduct,
        cantidadProducto,
        productos: state.productos,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export default PedidosProvider;
