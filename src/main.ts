import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
//import { AppCluster } from './app.cluster';                         # For more process
//import { RedisIoAdapter } from './adapters/redis-io-adapter';       # Adapt socket with reids

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //const redisIoAdapter = new RedisIoAdapter(app);
  //await redisIoAdapter.connectToRedis();

  //app.useWebSocketAdapter(redisIoAdapter);

  app.setGlobalPrefix('api/tool-box-virtual');

  app.enableCors({ origin: '*' });

  await app.listen(2000);
}

//AppCluster.clusterize(bootstrap); 
bootstrap();

