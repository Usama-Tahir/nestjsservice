import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {VersionSchema, VersionController, VersionService} from '.';
import {WidgetModule} from '../widget';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Version', schema: VersionSchema}]),
    WidgetModule,
  ],
  providers: [VersionService],
  controllers: [VersionController],
  exports: [VersionService]
})
export class VersionModule {}
