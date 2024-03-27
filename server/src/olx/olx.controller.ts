import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OlxService } from './olx.service';
import { CreateOlxOfferDto } from './dto/createOlxOffer.dto';
import { UpdateOlxOfferDto } from './dto/updateOlxOffer.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { Olx } from './entities/olx.entity';

@Controller('olx')
@ApiTags('Olx')
export class OlxController {
  constructor(private readonly olxService: OlxService) {}

  @Post()
  @ApiBody({ type: CreateOlxOfferDto })
  @ApiCreatedResponse({ description: 'The offer has been successfully created', type: CreateOlxOfferDto })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity - minimal price value must be at least 0.01' })
  @ApiConflictResponse({ description: 'Conflict - productId already exists' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createOlxOfferDto: CreateOlxOfferDto): Promise<Olx> {
    return await this.olxService.create(createOlxOfferDto);
  }

  @Get()
  @ApiOkResponse({ description: 'All offers returned successfully' })
  @ApiNotFoundResponse({ description: 'No offers found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll() {
    return this.olxService.findAll();
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Offer updated successfully' })
  @ApiNotFoundResponse({ description: 'No offer found' })
  @ApiConflictResponse({ description: 'Conflict - productId already exists' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: UpdateOlxOfferDto })
  @ApiOkResponse({ description: 'Updated offer successfully' })
  async update(@Param('id') id: string, @Body() updateOlxOfferDto: UpdateOlxOfferDto) {
    return await this.olxService.update(+id, updateOlxOfferDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Offer deleted successfully' })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.olxService.remove(+id);
  }
}
