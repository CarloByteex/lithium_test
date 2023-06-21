import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 8000;

const corsOption = {
  origin: "*"
}

app.use(cors(corsOption));
app.use(express.json());

// GraphQL
import schema from "./graphql";
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log("=========================================================================");
  console.log(`|                    LITHIUM SERVER STARTED AT PORT: ${port}            |`);
  console.log("|                                                                       |");
  console.log("|                                                created by softcruiser |");
  console.log("=========================================================================");
});
