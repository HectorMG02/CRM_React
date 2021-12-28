import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";
import Cliente from "../components/Cliente";

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
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CLIENTES_USUARIO);

  if (loading || error) return "Cargando...";

  const noAuth = () => {
    router.push("/login");
  };

  // FIXME: tengo que hacer estas comprobaciones porque si no me salta un error
  if (!data.obtenerClientesVendedor) {
    noAuth();
  } else if (!data.obtenerClientesVendedor) {
    noAuth();
  } else if (!data.obtenerClientesVendedor.map((cliente) => cliente.id)) {
    noAuth();
  }

  return (
    <>
      {localStorage.getItem("token_crm") ? (
        <Layout>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div>
              <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

              <Link href="/nuevoCliente">
                <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
                  Nuevo cliente
                </a>
              </Link>

              <table className="table-auto shadow-md mt-10 w-full w-lg">
                <thead className="bg-gray-800">
                  <tr className="text-white">
                    <th className="w-1/5 px-4 py-2">Nombre</th>
                    <th className="w-1/5 px-4 py-2">Empresa</th>
                    <th className="w-1/5 px-4 py-2">Email</th>
                    <th className="w-1/5 px-4 py-2">Editar</th>
                    <th className="w-1/5 px-4 py-2">Eliminar</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data.obtenerClientesVendedor.length > 0 ||
                  data.obtenerClientesVendedor == null
                    ? data.obtenerClientesVendedor.map((cliente) => (
                        <Cliente key={cliente.id} cliente={cliente} />
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          )}
        </Layout>
      ) : (
        noAuth()
      )}
    </>
  );
}
