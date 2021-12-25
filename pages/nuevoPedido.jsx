import { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
const nuevoPedido = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProducto />
          <ResumenPedido />
        </div>
      </div>
    </Layout>
  );
};

export default nuevoPedido;
