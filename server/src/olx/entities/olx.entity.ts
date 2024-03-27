import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
@Entity({ name: 'olx' })
export class Olx extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 25, unique: true })
  productId!: string;

  @Column({ length: 75 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  url!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price!: number;

  @Column()
  createdTime!: Date;

  @Column({ type: 'text', nullable: true })
  thumbnailUrl?: string;

  @Column({ default: false })
  disable!: boolean;
}
