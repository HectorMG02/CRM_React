import Layout from "../components/Layout";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Pedido from "../components/Pedido";

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

const pedidos = () => {
  const { data, loading, error } = useQuery(GET_PEDIDOS);

  if (loading) return "Cargando...";

  const { obtenerPedidosVendedor } = data;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

        <Link href="/nuevoPedido">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
            Nuevo pedido
          </a>
        </Link>

        {obtenerPedidosVendedor.length === 0 ? (
          <p>No hay pedidos</p>
        ) : (
          obtenerPedidosVendedor.map((pedido) => (
            <Pedido key={pedido.id} pedido={pedido} />
          ))
        )}
      </Layout>
    </div>
  );
};

export default pedidos;
