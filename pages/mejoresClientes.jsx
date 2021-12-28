import { useEffect } from "react";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const MEJORES_VENDEDORES = gql`
  query mejoresVendedores {
    mejoresVendedores {
      vendedor {
        nombre
        email
      }
      total
    }
  }
`;

const mejoresClientes = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(MEJORES_VENDEDORES);

  useEffect(() => {
    startPolling(1000); // consulta la base de datos despues de 1 segundo
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";

  const { mejoresVendedores } = data;
  const vendedoresGrafico = [];

  mejoresVendedores.map((vendedor, index) => {
    vendedoresGrafico[index] = {
      ...vendedor.vendedor[0],
      total: vendedor.total,
    };
  });

  console.log(vendedoresGrafico);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores vendedores</h1>

      <BarChart
        width={600}
        height={500}
        data={vendedoresGrafico}
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
    </Layout>
  );
};

export default mejoresClientes;
