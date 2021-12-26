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

  const addProduct = (productosSeleccionados) => {
    let nuevosProductos;
    if (state.productos.length > 0) {
      nuevosProductos = productosSeleccionados.map((producto) => {
        const nuevoObjeto = state.productos.find(
          (pState) => pState.id === producto.id
        );
        return {
          ...producto,
          ...nuevoObjeto,
        };
      });
    } else {
      nuevosProductos = productosSeleccionados;
    }

    setState({
      ...state,
      productos: nuevosProductos,
    });
  };

  const cantidadProducto = (nuevoProducto) => {
    const newProducts = state.productos.map((producto) => {
      if (producto.id === nuevoProducto.id) {
        return nuevoProducto;
      }
      return producto;
    });

    let newTotal = 0;
    newProducts.forEach((producto) => {
      newTotal += producto.precio * producto.cantidad;
    });

    setState({
      ...state,
      productos: newProducts,
      total: newTotal.toFixed(2),
    });
  };

  const unlinkProduct = (productosSeleccionados) => {
    let nuevosProductos;
    if (state.productos.length > 0) {
      nuevosProductos = productosSeleccionados.map((producto) => {
        const nuevoObjeto = state.productos.find(
          (pState) => pState.id === producto.id
        );
        return {
          ...producto,
          ...nuevoObjeto,
        };
      });
    } else {
      nuevosProductos = productosSeleccionados;
    }

    let newTotal = 0;
    nuevosProductos.forEach((producto) => {
      newTotal += producto.precio * producto.cantidad;
    });

    setState({
      ...state,
      productos: nuevosProductos,
      total: newTotal.toFixed(2),
    });
  };

  return (
    <PedidosContext.Provider
      value={{
        addClient,
        addProduct,
        cantidadProducto,
        unlinkProduct,
        productos: state.productos,
        total: state.total,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export default PedidosProvider;
