import { useContext } from "react";
import { PedidosContext } from "../../context/PedidosProvider";
import ProductoResumen from "./ProductoResumen";

const ResumenPedido = () => {
  const pedidoContext = useContext(PedidosContext);

  const { productos } = pedidoContext;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3 - Ajusta las cantidades del producto
      </p>

      {productos.length > 0 ? (
        <>
          {productos.map((producto) => (
            <ProductoResumen key={producto.id} producto={producto} />
          ))}
        </>
      ) : (
        <p className="mt-5">Todavía no hay productos</p>
      )}
    </>
  );
};

export default ResumenPedido;
