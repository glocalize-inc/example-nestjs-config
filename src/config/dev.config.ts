import { SchemaConfig } from "./schema.config";

export default SchemaConfig.from({
  port: 80,
  database: {
    host: "",
    port: 5432,
    username: "glo",
    password: "",
    database: "mamos",
  },
});
