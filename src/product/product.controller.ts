import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {ProductService, ProductDTO, Product} from '.';
import {VersionDto, Version, GetVersions} from '../version';

@ApiUseTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post(':productId/version')
    createVersion(
        @Param('productId') productId: string,
        @Body() version: VersionDto
    ): Promise<Version> {
        return this.productService.createVersion(productId, version);
    }

    @Get(':productId/version/:versionId')
    getVersion(
        @Param('productId') productId: string,
        @Param('versionId') versionId: string): Promise<Version> {
        return this.productService.getProductVersion(
            productId,
            versionId);
    }

    @Get(':id/versions')
    getProductVersions(@Param('id') id: string): Promise<GetVersions> {
        return this.productService.getProductVersions(id);
    }

    @Get('list')
    listProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Delete(':productId/version/:versionId')
    deleteVersion(
        @Param('productId') productId: string,
        @Param('versionId') versionId: string,
    ) {
        return this.productService.deleteVersion(productId, versionId);
    }

    @Get(':id')
    getProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.getProduct(id);
    }

    @Post()
    createProduct(@Body() product: ProductDTO): Promise<Product> {
        return this.productService.createProduct(product);
    }
}
