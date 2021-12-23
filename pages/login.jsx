import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const USER_LOGIN = gql`
  mutation autenticarUsuario($input: AutenticarInput!) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const login = () => {
  const [error, setError] = useState(null);
  const [autenticarUsuario] = useMutation(USER_LOGIN);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token_crm");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      try {
        const { email, password } = values;

        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        const { token } = data.autenticarUsuario;

        localStorage.setItem("token_crm", token);

        router.push("/");
      } catch (error) {
        setError(error.message);

        setTimeout(() => {
          setError(null);
        }, 1500);
      }
    },
  });

  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">Login</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="Email del usuario"
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

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  placeholder="Password del usuario"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>

              {error ? (
                <div>
                  <p className="text-red-500 mt-3 text-center">{error}</p>
                </div>
              ) : null}

              <button
                type="submit"
                className="bg-gray-800 w-full mt-4 p-2 text-white uppercase hover:bg-gray-900"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default login;
