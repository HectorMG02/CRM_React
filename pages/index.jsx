import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";

const GET_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      email
      empresa
      telefono
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_CLIENTES_USUARIO);

  return (
    <>
      <Layout>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div>
            <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

            <table className="table-auto shadow-md mt-10 w-full w-lg">
              <thead className="bg-gray-800">
                <tr className="text-white">
                  <th className="w-1/5 px-4 py-2">Nombre</th>
                  <th className="w-1/5 px-4 py-2">Empresa</th>
                  <th className="w-1/5 px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.obtenerClientesVendedor.map((cliente) => (
                  <tr key={cliente.id} className="text-center">
                    <td className="border px-4 py-2">{cliente.nombre}</td>
                    <td className="border px-4 py-2">{cliente.empresa}</td>
                    <td className="border px-4 py-2">{cliente.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Layout>
    </>
  );
}
