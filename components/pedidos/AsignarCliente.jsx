import { useState, useEffect } from "react";
import Select from "react-select";
import { PedidosContext } from "../../context/PedidosProvider";
import { useRouter } from "next/router";
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

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const AsignarCliente = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CLIENTES_USUARIO);
  const [cliente, setCliente] = useState([]);

  // cada vez que cambia sabores, se ejecuta el useEffect
  useEffect(() => {
    console.log("cliente", cliente);
  }, [cliente]);

  if (loading) return "Cargando...";

  const { obtenerClientesVendedor } = data;

  const seleccionarCliente = (values) => {
    setCliente(values);
  };

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        Asignar cliente
      </p>
      <Select
        className="mt-3"
        instanceId="cliente"
        options={obtenerClientesVendedor}
        getOptionLabel={(option) => option.nombre}
        getOptionValue={(option) => option.id}
        isMulti={true}
        onChange={seleccionarCliente}
      />
    </>
  );
};

export default AsignarCliente;
