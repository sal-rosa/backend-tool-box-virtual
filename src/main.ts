import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppCluster } from './app.cluster';
import { RedisIoAdapter } from './adapters/redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  app.enableCors({ origin: '*' });

  app.setGlobalPrefix('api-tool-box-virtual');

  await app.listen(2000);
}

AppCluster.clusterize(bootstrap);
//bootstrap();

