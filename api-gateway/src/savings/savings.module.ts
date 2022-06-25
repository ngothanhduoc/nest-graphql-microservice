import { join } from "path";
import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import {
  ClientProxyFactory,
  Transport,
  ClientGrpcProxy,
} from "@nestjs/microservices";

import { SavingsTypeResolver } from "./savings-type.resolver";
import { SavingsQueryResolver } from "./savings-query.resolver";
import { SavingMutationResolver } from "./savings-mutation.resolver";

import { UtilsModule } from "../utils/utils.module";

@Module({
  imports: [ConfigModule, LoggerModule, UtilsModule],
  providers: [
    SavingsTypeResolver,
    SavingsQueryResolver,
    SavingMutationResolver,
    {
      provide: "SavingsServiceClient",
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        console.log(configService.get<string>("SAVINGS_SVC_URL"));

        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>("SAVINGS_SVC_URL"),
            package: "saving",
            protoPath: join(__dirname, "../_proto/saving.proto"),
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ["SavingsServiceClient"],
})
export class SavingsModule {}
