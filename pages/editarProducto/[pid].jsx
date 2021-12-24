import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const GET_PRODUCT = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

const editarProducto = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id: pid,
    },
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre del producto es obligatorio"),
    existencia: Yup.number()
      .required("La cantidad es obligatoria")
      .min(1, "La cantidad debe ser mayor a 0"),
    precio: Yup.number().required("El precio es obligatorio"),
  });

  if (loading || !data) return "Cargando...";
  const { obtenerProducto } = data;

  const submitEditProduct = async (values) => {
    const { nombre, existencia, precio } = values;

    console.log(values, pid);

    try {
      const { data } = await updateProduct({
        variables: {
          id: pid,
          input: {
            nombre,
            existencia,
            precio,
          },
        },
      });

      console.log({ data });

      Swal.fire(
        "Actualizado!",
        "El producto se ha actualizado correctamente",
        "success"
      );

      router.push("/productos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={obtenerProducto}
            onSubmit={async (values) => {
              submitEditProduct(values);
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
                      htmlFor="existencia"
                    >
                      Cantidad
                    </label>
                    <input
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="existencia"
                      placeholder="Cantidad del producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.existencia}
                    />

                    {props.touched.cantidad && props.errors.cantidad ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.cantidad}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="precio"
                    >
                      Precio
                    </label>
                    <input
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="precio"
                      placeholder="Precio del producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.precio}
                    />

                    {props.touched.precio && props.errors.precio ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.precio}</p>
                      </div>
                    ) : null}
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

export default editarProducto;
