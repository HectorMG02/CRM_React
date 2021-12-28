import { useEffect } from "react";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const MEJORES_CLIENTES = gql`
  query mejoresClientes {
    mejoresClientes {
      cliente {
        nombre
        empresa
      }
      total
    }
  }
`;

const mejoresClientes = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(MEJORES_CLIENTES);

  useEffect(() => {
    startPolling(1000); // consulta la base de datos despues de 1 segundo
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";

  const { mejoresClientes } = data;
  const clientesGrafico = [];

  mejoresClientes.map((cliente, index) => {
    clientesGrafico[index] = {
      ...cliente.cliente[0],
      total: cliente.total,
    };
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores clientes</h1>

      <ResponsiveContainer width="99%" height={550}>
        <BarChart
          width={600}
          height={500}
          data={clientesGrafico}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default mejoresClientes;
