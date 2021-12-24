import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_USER_DATA = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

const Header = () => {
  const router = useRouter();

  if (!localStorage.getItem("token_crm")) {
    router.push("/login");
  }

  const { data, loading, error } = useQuery(GET_USER_DATA);

  if (loading) return null;

  const { nombre, apellido } = data.obtenerUsuario || {};

  const logout = () => {
    localStorage.removeItem("token_crm");
    router.push("/login");
  };

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        {nombre} {apellido}
      </p>

      <button
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md hover:bg-blue-900"
        onClick={logout}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
