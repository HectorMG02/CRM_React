import React from "react";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`;

const GET_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;
const Producto = ({ producto: { nombre, existencia, precio, id } }) => {
  const router = useRouter();
  const editarProducto = (id) => {
    router.push({
      pathname: "/editarProducto/[id]",
      query: { id },
    });
  };

  const [eliminarProductoSubmit] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      const { obtenerProductos } = cache.readQuery({
        query: GET_PRODUCTOS,
      });

      cache.writeQuery({
        query: GET_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter(
            (productoActual) => productoActual.id !== id
          ),
        },
      });
    },
  });

  const eliminarProducto = (id) => {
    Swal.fire({
      title: `¿Estas seguro de que quieres eliminar este producto?\n <u>&bull;${nombre}</u>`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      try {
        const { data } = await eliminarProductoSubmit({
          variables: {
            id,
          },
        });

        Swal.fire(
          "Eliminado!",
          `El producto ${nombre} ha sido eliminado con éxito.`,
          "success"
        );
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
      }
    });
  };

  return (
    <tr className="text-center">
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2">{existencia} piezas</td>
      <td className="border px-4 py-2">{precio} €</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center p-2 w-full rounded-md text-white font-bold bg-green-600 hover:bg-green-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150"
          onClick={() => editarProducto(id)}
        >
          Editar
          <svg
            className="w-6 h-6 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center p-2 w-full rounded-md text-white font-bold bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150"
          onClick={() => eliminarProducto(id)}
        >
          Eliminar
          <svg
            className="w-6 h-6 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Producto;
