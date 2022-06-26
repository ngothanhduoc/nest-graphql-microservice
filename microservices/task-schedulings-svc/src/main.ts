import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import RabbitmqServer from "./task-scheduling/rabbitmq-server";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
