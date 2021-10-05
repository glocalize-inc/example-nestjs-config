import { Logger } from '@nestjs/common'
import { classToPlain, plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { DeepPartial, ObjectLiteral } from 'typeorm'

export class BaseConfig {
  public static from<T extends ObjectLiteral>(
    this: new () => T,
    record: DeepPartial<T>,
  ): Record<string, any> {
    const klass = plainToClass(this, record)
    const errors = validateSync(klass)
    if (errors.length > 0) {
      Logger.error(errors.map(v => v.toString()).toString())
      throw new Error('Configuration Validation Error Occured')
    }
    if (klass.hasOwnProperty('logConfig') && klass.logConfig) {
      Logger.debug(klass)
    }
    return classToPlain(klass)
  }

  public static async get({
    title,
    key,
  }: {
    title?: string
    key?: string
  } = {}): Promise<Record<string, any>> {
    const config = (
      await import(
        `./${title ? title || 'local' : process.env.NODE_ENV || 'local'}.config`
      )
    ).default
    return key ? config[key] : config
  }
}
