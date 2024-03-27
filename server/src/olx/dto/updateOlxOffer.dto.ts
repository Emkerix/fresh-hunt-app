import { PartialType } from '@nestjs/swagger';
import { CreateOlxOfferDto } from './createOlxOffer.dto';

export class UpdateOlxOfferDto extends PartialType(CreateOlxOfferDto) {}
