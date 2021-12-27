import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { PedidosContext } from "../../context/PedidosProvider";
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

const AsignarCliente = () => {
  const { data, loading, error } = useQuery(GET_CLIENTES_USUARIO);
  const [cliente, setCliente] = useState([]);
  const pedidoContext = useContext(PedidosContext);
  const { addClient } = pedidoContext;

  // cada vez que cambia sabores, se ejecuta el useEffect
  useEffect(() => {
    addClient(cliente);
  }, [cliente]);

  if (loading) return "Cargando...";

  const { obtenerClientesVendedor } = data;

  const seleccionarCliente = (values) => {
    setCliente(values);
  };

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1 - Asignar cliente
      </p>
      <Select
        className="mt-3"
        instanceId="cliente"
        options={obtenerClientesVendedor}
        getOptionLabel={(option) => option.nombre}
        getOptionValue={(option) => option.id}
        isMulti={false}
        onChange={seleccionarCliente}
      />
    </>
  );
};

export default AsignarCliente;
