import { mergeSchemas } from "@graphql-tools/schema";

import authSchema from "./auth";

const mergedSchema = mergeSchemas({
  schemas: [authSchema]
});

export default mergedSchema;
