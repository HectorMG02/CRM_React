import { useReducer } from "react";
import pedidoContext from "./pedidoContext";
import pedidoReducer from "./pedidoReducer";
import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
} from "../../types";

const pedidoState = ({ children }) => {
  const initialState = {
    cliente: [],
    productos: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(pedidoReducer, initialState);

  const sayHi = () => {
    console.log("hi");
  };

  return (
    <pedidoContext.Provider
      value={{
        sayHi,
      }}
    >
      {children}
    </pedidoContext.Provider>
  );
};

export default pedidoState;
