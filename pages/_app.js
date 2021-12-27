import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import PedidosProvider from "../context/PedidosProvider";

function MyApp({ Component, pageProps }) {
  return (
    <PedidosProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </PedidosProvider>
  );
}

export default MyApp;
