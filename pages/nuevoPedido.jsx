import { useState, useContext } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";
import { PedidosContext } from "../context/PedidosProvider";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const GET_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        nombre
        cantidad
      }
      cliente {
        id
        nombre
        telefono
        email
        empresa
      }
      vendedor
      total
      estado
    }
  }
`;

const nuevoPedido = () => {
  const router = useRouter();
  const pedidoContext = useContext(PedidosContext);
  const { cliente, productos, total } = pedidoContext;
  const { id } = cliente;
  const [mensaje, setMensaje] = useState("");

  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
    update(cache, { data: { nuevoPedido } }) {
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: GET_PEDIDOS,
      });

      cache.writeQuery({
        query: GET_PEDIDOS,
        data: {
          obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido],
        },
      });
    },
  });

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? "opacity-50 cursor-not-allowed"
      : null;
  };

  const crearPedido = async () => {
    const pedido = productos.map(
      ({ __typename, existencia, creado, precio, ...producto }) => {
        return producto;
      }
    );

    total = Number(total);
    total = total.toFixed(2);
    total = Number(total);

    //FIXME: esto está modo cutre para que funcione
    if (validarPedido() === null) {
      try {
        const data = await nuevoPedido({
          variables: {
            input: {
              cliente: id,
              total,
              pedido,
            },
          },
        });

        router.push("/pedidos");

        Swal.fire(
          "Pedido creado",
          "El pedido se creo correctamente",
          "success"
        );
      } catch (error) {
        setMensaje(error.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          setMensaje("");
        }, 3000);
      }
    }
  };

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje} </p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

      {mensaje && mostrarMensaje()}

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
