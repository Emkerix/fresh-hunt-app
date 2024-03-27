import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateOlxOfferDto {
  @ApiProperty({ uniqueItems: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(75)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ minimum: 0.01 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  createdTime: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty({ default: 'false' })
  @IsNotEmpty()
  @IsBoolean()
  disable: boolean;

  constructor(
    productId: string,
    title: string,
    description: string,
    url: string,
    price: number,
    createdTime: Date,
    disable: boolean,
    thumbnailUrl?: string
  ) {
    this.productId = productId;
    this.title = title;
    this.description = description;
    this.url = url;
    this.price = price;
    this.createdTime = createdTime;
    this.disable = disable;
    this.thumbnailUrl = thumbnailUrl;
  }
}
