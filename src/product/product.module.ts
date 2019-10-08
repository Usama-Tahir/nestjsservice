import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductService, ProductController, ProductSchema} from '.';
import {VersionModule} from '../version';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]),
    VersionModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
