import React from "react";

const Cliente = ({ cliente }) => {
  const { nombre, apellido, email, empresa, id } = cliente;

  const eliminarCliente = (id) => {
    console.log({ id });
  };

  return (
    <tr className="text-center">
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center p-2 w-full rounded-md text-white font-bold bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150"
          onClick={() => eliminarCliente(id)}
        >
          Eliminar
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
