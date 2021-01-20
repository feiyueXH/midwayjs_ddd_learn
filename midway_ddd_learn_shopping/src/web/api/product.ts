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
import { IProductAppService } from '../../application/service/product';
import { ProductVO } from '../../infrastructure/vo/product';
import { Converter } from '../../infrastructure/util/converter';

@Provide()
@Controller('/')
export class ProductController {
  @Inject()
  productAppService: IProductAppService;

  @Post('/products')
  async addProduct(@Body(ALL) product: SaveProductDTO): Promise<string> {
    await this.productAppService.addProduct(product);
    return '新增商品成功';
  }

  @Get('/products/:productId')
  async getProduct(@Param() productId: string): Promise<ProductVO> {
    const result = await this.productAppService.getProduct(productId);
    return Converter.entityConvertEntity(result, ProductVO);
  }

  @Del('/products/:productId')
  async removeProduct(@Param() productId: string): Promise<string> {
    await this.productAppService.removeProduct(productId);
    return '新增商品成功';
  }
}
