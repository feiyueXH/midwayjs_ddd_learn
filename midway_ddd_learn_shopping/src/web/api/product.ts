import {
  ALL,
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { Converter } from '../../infrastructure/common/util/converter';
import { HttpHelper } from '../../infrastructure/common/http/helper';
import { ProductVO } from '../vo/product';
import { ICommandBus } from '../../infrastructure/core/command-bus';
import { AddProductCommand } from '../../application/command/product/impl/add-product.command';
import { ListProductDTO, SaveProductDTO } from '../dto/product';
import { RemoveProductCommand } from '../../application/command/product/impl/remove-product.command';
import { IQueryBus } from '../../infrastructure/core/query-bus';
import { GetProductDetailQuery } from '../../application/query/product/impl/get-product-detail.query';
import { ListProductQuery } from '../../application/query/product/impl/list-product.query';

@Provide()
@Controller('/products')
export class ProductController {
  @Inject()
  queryBus: IQueryBus;

  @Inject()
  commandBus: ICommandBus;

  @Inject()
  httpHelper: HttpHelper;

  @Post('/')
  async addProduct(@Body(ALL) product: SaveProductDTO): Promise<void> {
    //通过命令总线发送创建商品命令
    await this.commandBus.send(
      new AddProductCommand(product.productName, product.price, product.stock)
    );
    this.httpHelper.success(null, '新增商品成功');
  }

  @Get('/:productId')
  async getProduct(@Param('productId') productId: string): Promise<void> {
    // const result = await this.productQueryService.getProduct(productId);
    const product = await this.queryBus.send(
      new GetProductDetailQuery(productId)
    );
    this.httpHelper.success(
      Converter.entityConvertEntity(product, ProductVO),
      '查询商品成功'
    );
  }

  @Get('/')
  async listProduct(@Query(ALL) query: ListProductDTO): Promise<void> {
    const products = await this.queryBus.send(
      new ListProductQuery(query.productName, query.page, query.limit)
    );
    this.httpHelper.success(products, '查询商品成功');
  }

  @Del('/:productId')
  async removeProduct(@Param('productId') productId: string): Promise<void> {
    //通过命令总线发送删除商品命令
    await this.commandBus.send(new RemoveProductCommand(productId));
    this.httpHelper.success(null, '删除商品成功');
  }
}
