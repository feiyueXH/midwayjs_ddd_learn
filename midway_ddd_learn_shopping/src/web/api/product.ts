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
} from '@midwayjs/decorator';
import { SaveProductDTO } from '../../infrastructure/dto/product';
import { IProductCommandService } from '../../application/command/service/product';
import { ProductVO } from '../../infrastructure/vo/product';
import { Converter } from '../../infrastructure/util/converter';
import { HttpHelper } from '../../infrastructure/http/helper';
import { IProductQueryService } from '../../application/query/service/product';

@Provide()
@Controller('/products')
export class ProductController {
  @Inject()
  productCommandService: IProductCommandService;

  @Inject()
  productQueryService: IProductQueryService;

  @Inject()
  httpHelper: HttpHelper;

  @Post('/')
  async addProduct(@Body(ALL) product: SaveProductDTO): Promise<void> {
    await this.productCommandService.addProduct(product);
    this.httpHelper.success(null, '新增商品成功');
  }

  @Get('/:productId')
  async getProduct(@Param('productId') productId: string): Promise<void> {
    const result = await this.productQueryService.getProduct(productId);
    this.httpHelper.success(
      Converter.entityConvertEntity(result, ProductVO),
      '查询商品成功'
    );
  }

  @Del('/:productId')
  async removeProduct(@Param('productId') productId: string): Promise<void> {
    console.log(`productId:${productId}`);
    await this.productCommandService.removeProduct(productId);
    this.httpHelper.success(null, '删除商品成功');
  }
}
