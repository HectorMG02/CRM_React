import { useContext, useState, useEffect } from "react";
import { PedidosContext } from "../../context/PedidosProvider";

const Total = () => {
  const pedidoContext = useContext(PedidosContext);
  const { total } = pedidoContext;

  return (
    <div className="flex items-center mt-5 justify-between bg-gray-300 p-3 border-solid border-2 border-gray-500">
      <h2 className="text-gray-800 text-lg">Total a pagar</h2>
      <p className="text-gray-800 mr-1">{total} €</p>
    </div>
  );
};

export default Total;
