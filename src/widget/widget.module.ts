import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {WidgetSchema, WidgetService, WidgetController} from '.';
import {VersionModule} from '../version';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Widget', schema: WidgetSchema}]),
  ],
  providers: [WidgetService],
  controllers: [],
  exports: [
    WidgetService
  ]
})
export class WidgetModule {}
