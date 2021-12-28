import { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const NEW_CLIENT = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      email
      empresa
      telefono
      vendedor
    }
  }
`;

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

const nuevoCliente = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);

  const [nuevoCliente] = useMutation(NEW_CLIENT, {
    // actualizamos el cache con los datos del nuevo cliente
    update(cache, { data: { nuevoCliente } }) {
      const { obtenerClientesVendedor } = cache.readQuery({
        query: GET_CLIENTES_USUARIO,
      });

      // reescribimos el cache, que no se debe modificar, solo reescribir
      cache.writeQuery({
        query: GET_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente], // agregamos a un array nuevo, el nuevo cliente que hemos creado, junto con los clientes que ya existian
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      empresa: Yup.string().required("La empresa es obligatoria"),
    }),
    onSubmit: async (values) => {
      const { nombre, apellido, email, empresa, telefono } = values;

      try {
        const data = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              empresa,
              telefono,
            },
          },
        });

        return router.push("/");
      } catch (error) {
        setMensaje(error.message);

        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
  });

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl text-gray-800 font-light">Nuevo cliente</h1>

        {mensaje && showMessage()}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  placeholder="Nombre del cliente"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.nombre}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="apellido"
                  placeholder="Apellido del cliente"
                  onChange={formik.handleChange}
                  value={formik.values.apellido}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.apellido && formik.errors.apellido ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.apellido}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="Email del cliente"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="empresa"
                >
                  Empresa
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="empresa"
                  placeholder="Empresa del cliente"
                  onChange={formik.handleChange}
                  value={formik.values.empresa}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.empresa && formik.errors.empresa ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.empresa}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="telefono"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="telefono"
                  placeholder="Teléfono del cliente"
                  onChange={formik.handleChange}
                  value={formik.values.telefono}
                  onBlur={formik.handleBlur}
                />
              </div>

              <button
                type="submit"
                className="bg-gray-800 w-full mt-4 p-2 text-white uppercase hover:bg-gray-900"
              >
                Crear cliente
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default nuevoCliente;
