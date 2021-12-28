import React from "react";
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

const mejoresVendedores = () => {
  const { data, loading, error } = useQuery(MEJORES_VENDEDORES);

  if (loading) return "Cargando...";

  const { mejoresVendedores } = data;
  const vendedoresGrafico = [];

  mejoresVendedores.map((vendedor, index) => {
    vendedoresGrafico[index] = {
      ...vendedor.vendedor[0],
      total: vendedor.total,
    };
  });

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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </Layout>
  );
};

export default mejoresVendedores;
