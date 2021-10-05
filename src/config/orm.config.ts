import { ConnectionOptionsReader } from 'typeorm'
import { SchemaConfig } from './schema.config'

const config = () => {
  const prototype = ConnectionOptionsReader.prototype as any

  const original = prototype.normalizeConnectionOptions

  prototype.normalizeConnectionOptions = function(
    options: Promise<any> | object,
  ) {
    if ('then' in options) {
      return options.then(arg => original.call(this, arg))
    }

    return original.call(this, options)
  }

  return SchemaConfig.get({ key: 'database' })
}

export = config()
