import { SchemaConfig } from "./schema.config";

export default SchemaConfig.from({
  port: 2000,
  database: {
    host: "127.0.0.1",
    port: 17001,
    username: "glo",
    password: "dev",
    database: "mamos",
  },
});
