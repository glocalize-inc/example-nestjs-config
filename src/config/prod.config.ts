import { SchemaConfig } from './schema.config'

export default SchemaConfig.from({
  port: 80,
  database: {
    host: process.env.DBHOST,
    port: parseInt(process.env.DBPORT || '5432', 10),
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    migrationsRun: true,
  },
})
