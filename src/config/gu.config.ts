import { SchemaConfig } from './schema.config'

export default SchemaConfig.from({
  port: 80,
  database: {
    host: 'local-pg',
    port: 5432,
    username: 'glo',
    password: 'dev',
    database: 'mamos',
  },
})
