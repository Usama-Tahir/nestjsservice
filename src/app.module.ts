import {Module} from '@nestjs/common';
import {ProductModule} from './product';
import {MongooseModule} from '@nestjs/mongoose';
import {VersionModule} from './version';
import {WidgetModule} from './widget';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://', {
      authSource: "admin",
      useNewUrlParser: true,
      dbName: "Bnked",
      keepAlive: 300000,
      poolSize: 10,
      useFindAndModify: false
    }),
    VersionModule,
    ProductModule,
    WidgetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
