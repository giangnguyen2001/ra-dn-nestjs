import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/product.controller';
import { ProductsService } from './providers/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductDetail])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
