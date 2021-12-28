import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const GET_CLIENT = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      nombre
      apellido
      email
      empresa
      telefono
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      id
      nombre
    }
  }
`;

const EditarCliente = (props) => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id: pid,
    },
  });

  const [updateClient] = useMutation(UPDATE_CLIENT);

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es obligatorio"),
    empresa: Yup.string().required("La empresa es obligatoria"),
  });

  if (loading || !data) return "Cargando...";
  const { obtenerCliente } = data;

  const submitEditClient = async (values) => {
    const { nombre, apellido, email, empresa, telefono } = values;

    try {
      const { data } = await updateClient({
        variables: {
          id: pid,
          input: {
            nombre,
            apellido,
            email,
            empresa,
            telefono,
          },
        },
      });

      Swal.fire(
        "Actualizado!",
        "El cliente se ha actualizado correctamente",
        "success"
      );

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={async (values) => {
              submitEditClient(values);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                    />

                    {props.touched.nombre && props.errors.nombre ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.nombre}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.apellido}
                    />

                    {props.touched.apellido && props.errors.apellido ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.apellido}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                    />

                    {props.touched.email && props.errors.email ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.email}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.empresa}
                    />

                    {props.touched.empresa && props.errors.empresa ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.empresa}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.telefono}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-gray-800 w-full mt-4 p-2 text-white uppercase hover:bg-gray-900"
                  >
                    Guardar cambios
                  </button>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;
