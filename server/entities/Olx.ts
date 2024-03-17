import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Olx {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  productId: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  thumbnailUrl: string;

  @Column({ nullable: false, default: 0 })
  disable: boolean;

  constructor(title: string, productId: string, price: number, date: Date, thumbnailUrl: string, disable: boolean) {
    this.productId = productId;
    this.title = title;
    this.price = price;
    this.date = date;
    this.thumbnailUrl = thumbnailUrl;
    this.disable = disable;
  }
}