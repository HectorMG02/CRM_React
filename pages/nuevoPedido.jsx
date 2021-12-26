import { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";
import { PedidosContext } from "../context/PedidosProvider";
import { gql, useMutation } from "@apollo/client";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const nuevoPedido = () => {
  const pedidoContext = useContext(PedidosContext);
  const { cliente, productos, total } = pedidoContext;
  const { id } = cliente;

  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? "opacity-50 cursor-not-allowed"
      : null;
  };

  const crearPedido = async () => {
    const pedido = productos.map(
      ({ __typename, existencia, creado, nombre, precio, ...producto }) => {
        return producto;
      }
    );

    total = Number(total);
    total = total.toFixed(2);
    total = Number(total);
    let input = {
      cliente: id,
      total,
      pedido,
    };

    console.log(input);

    //FIXME: esto está modo cutre para que funcione
    if (validarPedido() === null) {
      try {
        const data = await nuevoPedido({
          variables: {
            input,
          },
        });

        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProducto />
          <ResumenPedido />

          <Total />

          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
            onClick={() => crearPedido()}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default nuevoPedido;
