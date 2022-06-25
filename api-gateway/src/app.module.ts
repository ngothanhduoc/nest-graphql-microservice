import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule, GqlModuleOptions } from "@nestjs/graphql";

import { LoggerModule, PinoLogger } from "nestjs-pino";

import {
  DateTimeResolver,
  EmailAddressResolver,
  UnsignedIntResolver,
} from "graphql-scalars";
import { GraphQLJSONObject } from "graphql-type-json";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { SavingsModule } from "./savings/savings.module";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          safe: true,
          prettyPrint: configService.get<string>("NODE_ENV") !== "production",
        },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.schema.graphql"],
    }),
    AuthModule,
    UsersModule,
    SavingsModule,
  ],
})
export class AppModule {}
