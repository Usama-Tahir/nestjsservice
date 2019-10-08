import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Version, VersionDto, GetVersions, VersionService} from '../version';
import {Product, ProductDTO} from '.';

// TODO: Come back and handle errors for these requests. Including failded db changes (use transactions, but need to have mongodb setup as a replica set)
// https://docs.mongodb.com/manual/replication/#transactions
// http://thecodebarbarian.com/a-node-js-perspective-on-mongodb-4-transactions.html
// https://www.tutorialkart.com/mongodb/setup-mongodb-replica-set/
@Injectable()
export class ProductService {
    [x: string]: any;
    constructor(
        @InjectModel('Product') private productModel: Model<Product>,
        private readonly versionService: VersionService
    ) {}
    async createVersion(
        productId: string,
        versionDto: VersionDto): Promise<Version> {
        let versionSaved = await this.versionService.createVersion(versionDto);
        await this.productModel.findByIdAndUpdate(
            productId, {
            $push: {
                Versions: versionSaved.id,
            },
        });

        return versionSaved;
    }

    async getProductVersions(id: string): Promise<GetVersions> {
        const res = await this.productModel.findById(id).select([
            'Versions',
        ]).lean().exec();

        return {versions: res.Versions} as GetVersions;
    }

    async getProductVersion(
        productId: string,
        versionId: string): Promise<Version> {
        return await this.productModel.findById(productId).where({
            'Version.id': versionId,
        }).select(['-__v']).lean().exec();
    }

    async getVersion(id: string): Promise<Version> {
        return await this.versionService.findVersionById(id);
    }

    async deleteVersion(productId: string, versionId: string) {
        await this.productModel.findByIdAndUpdate(productId, {
            $pull: {Versions: versionId},
        });

        return await this.versionService.deleteVersionById(versionId);
    }

    async getProducts(): Promise<Product[]> {
        const result = await this.productModel.find().select([
            '-__v',
        ]).lean().exec();
        return result;
    }

    async getProduct(id: string): Promise<Product> {
        const result = await this.productModel.findById(id).select(['-__v']).lean().exec();
        return result;
    }

    async createProduct(productToSave: ProductDTO): Promise<Product> {
        const product = new this.productModel(productToSave);
        return await product.save();
    }

    async deleteProduct(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }
}
