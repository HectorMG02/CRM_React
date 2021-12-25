import { useContext, useState, useEffect } from "react";
import { PedidosContext } from "../../context/PedidosProvider";

const ProductoResumen = ({ producto }) => {
  const pedidoContext = useContext(PedidosContext);
  const [cantidad, setCantidad] = useState(0);
  const { cantidadProducto } = pedidoContext;

  const { nombre, precio } = producto;

  useEffect(() => {
    updateCantidad(cantidad);
  }, [cantidad]);

  const updateCantidad = (cantidad) => {
    const nuevoProducto = {
      ...producto,
      cantidad: Number(cantidad),
    };
    cantidadProducto(nuevoProducto);
  };

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <h2>{nombre}</h2>
        <p className="ml-5">&bull;{precio}€</p>
      </div>

      <input
        type="number"
        placeholder="cantidad"
        className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
    </div>
  );
};

export default ProductoResumen;
