import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator'
import { BaseConfig } from './base.config'

class DatabaseCliConfig {
  @IsString()
  @IsNotEmpty()
  migrationsDir: string = 'migrations'
}

class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  type: string = 'postgres'

  @IsString()
  @IsNotEmpty()
  host: string

  @IsNumber()
  @Type(() => Number)
  port: number = 5432

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  database: string

  @IsArray()
  @IsNotEmpty()
  entities: string[] = [
    __dirname + '/../**/entities/*{.ts,.js}',
    __dirname + '/../**/*.entities{.ts,.js}',
    __dirname + '/../**/entities/*{.ts,.js}',
    __dirname + '/../**/*.entity{.ts,.js}',
  ]

  @IsArray()
  @IsNotEmpty()
  migrations: string[] = [__dirname + '/../../migrations/**/*{.ts,.js}']

  @IsBoolean()
  @IsNotEmpty()
  synchronize: boolean = false

  @IsBoolean()
  @IsNotEmpty()
  migrationsRun: boolean = false

  @IsString()
  @IsNotEmpty()
  logging: string = 'all'

  @ValidateNested()
  @Type(() => DatabaseCliConfig)
  cli: DatabaseCliConfig = new DatabaseCliConfig()
}

export class ReCaptchaConfig {
  secret = '6Lfsk-EZAAAAAEFegXAP0AnCRVyUHy4E2SKF5Jap'
}

export class SchemaConfig extends BaseConfig {
  @IsNumber()
  @IsNotEmpty()
  readonly port: number = 3000

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => DatabaseConfig)
  readonly database: DatabaseConfig = new DatabaseConfig()

  @IsBoolean()
  readonly logConfig: boolean = false

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => ReCaptchaConfig)
  readonly reCaptcha = new ReCaptchaConfig()
}
