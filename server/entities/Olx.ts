import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Olx {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 25, unique: true, nullable: false })
  productId: string;

  @Column({ length: 75, nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  url: string;

  @Column({ type: 'numeric', precision: 10, nullable: false })
  price: number;

  @Column({ nullable: false })
  createdTime: Date;

  @Column({ nullable: true })
  thumbnailUrl?: string;

  @Column({ nullable: false, default: false })
  disable: boolean;

  constructor(
    productId: string,
    title: string,
    description: string,
    url: string,
    price: number,
    createdTime: Date,
    thumbnailUrl: string,
    disable: boolean = false
  ) {
    this.productId = productId;
    this.title = title;
    this.description = description;
    this.url = url;
    this.price = price;
    this.createdTime = createdTime;
    this.thumbnailUrl = thumbnailUrl;
    this.disable = disable;
  }
}
