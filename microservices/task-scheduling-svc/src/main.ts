// import { join } from "path";

// import { NestFactory } from "@nestjs/core";
// import { Transport, MicroserviceOptions } from "@nestjs/microservices";
// import { Logger } from "nestjs-pino";

// import { LoggerService, INestMicroservice } from "@nestjs/common";
// import { AppModule } from "./app.module";

// async function main() {
//   const app: INestMicroservice =
//     await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//       transport: Transport.GRPC,
//       options: {
//         url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
//         package: "taskScheduling",
//         protoPath: join(__dirname, "./_proto/taskScheduling.proto"),
//         loader: {
//           keepCase: true,
//           enums: String,
//           oneofs: true,
//           arrays: true,
//         },
//       },
//     });

//   app.useLogger(app.get<Logger, LoggerService>(Logger));

//   return app.listen();
// }

// main();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
