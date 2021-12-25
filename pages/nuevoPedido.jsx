import { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProducto from "../components/pedidos/AsignarProducto";
const nuevoPedido = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

      <AsignarCliente />
      <AsignarProducto />
    </Layout>
  );
};

export default nuevoPedido;
