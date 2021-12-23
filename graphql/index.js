const { ApolloServer, gql } = require("apollo-server");
const jwt = require("jsonwebtoken");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const conectarDB = require("./config/db");

conectarDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req.headers);

    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const usuario = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRETA
        );

        console.log({ usuario });
        return { usuario };
      } catch (error) {}
    }
  },
});

// listen
server.listen().then(({ url }) => {
  console.log("Servidor arrancado en:", url);
});
