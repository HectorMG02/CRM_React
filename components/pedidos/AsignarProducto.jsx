import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { PedidosContext } from "../../context/PedidosProvider";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
      creado
    }
  }
`;

const AsignarProducto = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTOS);
  const [producto, setProducto] = useState([]);
  const pedidoContext = useContext(PedidosContext);
  const { addProduct, unlinkProduct } = pedidoContext;

  useEffect(() => {
    addProduct(producto);
  }, [producto]);

  if (loading) return "Cargando...";

  const { obtenerProductos } = data;

  const seleccionarProducto = (values) => {
    if (producto.length > values.length) {
      unlinkProduct(values);
    } else {
      setProducto(values);
    }
  };

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2 - Selecciona o busca los productos
      </p>
      <Select
        className="mt-3"
        instanceId="cliente"
        options={obtenerProductos}
        getOptionLabel={(option) =>
          `${option.nombre} - ${option.existencia} Disponibles`
        }
        getOptionValue={(option) => option.id}
        isMulti={true}
        onChange={seleccionarProducto}
      />
    </>
  );
};

export default AsignarProducto;
