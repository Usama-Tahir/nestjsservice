import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: false,
    });
    //app.userLogger(app.get(KibanaLogger));
    app.setGlobalPrefix('v1')
    app.enableCors();

    await app.startAllMicroservicesAsync();
    console.log('Warming up microservice');
    //await app.listen(settings.ServicePort);
    await app.listen(3000);
    console.log('Micro service started');
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
