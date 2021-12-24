import { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const NEW_PRODUCT = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

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

const nuevoProducto = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);

  const [nuevoProducto] = useMutation(NEW_PRODUCT, {
    // actualizamos el cache con los datos del nuevo cliente
    update(cache, { data: { nuevoProducto } }) {
      const { obtenerProductos } = cache.readQuery({
        query: GET_PRODUCTOS,
      });

      // reescribimos el cache, que no se debe modificar, solo reescribir
      cache.writeQuery({
        query: GET_PRODUCTOS,
        data: {
          obtenerProductos: [...obtenerProductos, nuevoProducto], // agregamos a un array nuevo, el nuevo cliente que hemos creado, junto con los clientes que ya existian
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      cantidad: "",
      precio: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      cantidad: Yup.number()
        .required("La cantidad es obligatoria")
        .min(1, "La cantidad debe ser mayor a 0"),
      precio: Yup.number().required("El precio es obligatorio"),
    }),
    onSubmit: async ({ nombre, cantidad, precio }) => {
      try {
        const data = await nuevoProducto({
          variables: {
            input: {
              nombre: nombre,
              existencia: cantidad,
              precio: precio,
            },
          },
        });
        console.log({ data });

        router.push("/productos");
      } catch (error) {
        console.log(error);
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
        <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>

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
                  placeholder="Nombre producto"
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
                  htmlFor="cantidad"
                >
                  Cantidad disponible
                </label>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cantidad"
                  placeholder="Cantidad disponible"
                  onChange={formik.handleChange}
                  value={formik.values.cantidad}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.cantidad && formik.errors.cantidad ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.cantidad}</p>
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
                  onChange={formik.handleChange}
                  value={formik.values.precio}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.precio && formik.errors.precio ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.precio}</p>
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="bg-gray-800 w-full mt-4 p-2 text-white uppercase hover:bg-gray-900"
              >
                Crear producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default nuevoProducto;
