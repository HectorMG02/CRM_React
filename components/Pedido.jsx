import { useState, useEffect } from "react";

const Pedido = ({
  pedido: {
    id,
    total,
    cliente: { nombre, apellido, email, telefono, empresa },
    estado,
    pedido,
  },
}) => {
  const [estadoPedido, setEstadoPedido] = useState(estado);
  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido);
    }
  }, [estadoPedido]);

  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {nombre} {apellido}
        </p>
        <p className="text-gray-800">
          {email ? (
            <p className="flex items-center my-2">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              {email}
            </p>
          ) : null}

          {telefono ? (
            <p className="flex items-center my-2">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
              {telefono}
            </p>
          ) : null}
        </p>

        <h2 className="text-gray-800 font-bold mt-10">Estado del pedido:</h2>

        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white text-center text-sm py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-blue-700 focus:border-blue-700 uppercase text-xs font-bold"
          value={estadoPedido}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
        {pedido.map((articulo) => (
          <div key={articulo.id} className="mt-4">
            <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
            <p className="text-sm text-gray-600">
              Cantidad: {articulo.cantidad}
            </p>
          </div>
        ))}

        <p className="text-gray-800 mt-3 font-bold">
          Total a pagar:
          <span className="font-light ml-1">{total} €</span>
        </p>

        <button className="uppercase text-xs font-bold flex items-center mt-4 bg-red-600 hover:bg-red-500 px-5 py-2 inline-block text-white rounded leading-tight">
          Eliminar pedido
        </button>
      </div>
    </div>
  );
};

export default Pedido;
