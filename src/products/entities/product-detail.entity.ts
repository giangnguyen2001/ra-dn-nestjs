import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_detail')
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'gender', type: 'int' })
  gender: number;

  @Column({ name: 'phone_number', type: 'varchar', length: 13 })
  phoneNumber: string;

  @Column({ name: 'address', type: 'varchar', length: 320 })
  address: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
