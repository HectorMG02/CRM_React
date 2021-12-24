import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";

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

const ELIMINAR_CLIENTE_SUBMIT = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

const Cliente = ({ cliente }) => {
  const [eliminarClienteSubmit] = useMutation(ELIMINAR_CLIENTE_SUBMIT, {
    update(cache) {
      const { obtenerClientesVendedor } = cache.readQuery({
        query: GET_CLIENTES_USUARIO,
      });

      cache.writeQuery({
        query: GET_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(
            (clienteActual) => clienteActual.id !== cliente.id
          ),
        },
      });
    },
  });
  const { nombre, apellido, email, empresa, id } = cliente;

  const eliminarCliente = (id) => {
    Swal.fire({
      title: `¿Estas seguro de que quieres eliminar el cliente?\n\n <u>&bull;${nombre} ${apellido}</u>`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      console.log({ id });
      if (result.value) {
        try {
          const { data } = await eliminarClienteSubmit({
            variables: {
              id,
            },
          });

          Swal.fire(
            "Eliminado!",
            `El cliente ${nombre} ${apellido} de la empresa ${empresa} ha sido eliminado con éxito.`,
            "success"
          );
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "No se pudo eliminar el cliente", "error");
        }
      }
    });
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
            className="w-6 h-6"
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

export default Cliente;
