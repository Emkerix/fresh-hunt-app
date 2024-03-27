import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOlxOfferDto } from './dto/createOlxOffer.dto';
import { UpdateOlxOfferDto } from './dto/updateOlxOffer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Olx } from './entities/olx.entity';

@Injectable()
export class OlxService {
  constructor(@InjectRepository(Olx) private olxRepository: Repository<Olx>) {}

  async create(createOlxOfferDto: CreateOlxOfferDto): Promise<Olx> {
    const newOlxOffer = this.olxRepository.create(createOlxOfferDto);

    try {
      return await this.olxRepository.save(newOlxOffer);
    } catch (error: any) {
      if (error.code === '23505' && error.constraint === 'productId_unique') {
        throw new ConflictException('Duplicate productId');
      } else {
        throw error;
      }
    }
  }

  async findAll(): Promise<Olx[]> {
    return await this.olxRepository.find();
  }

  async update(id: number, updateOlxOfferDto: UpdateOlxOfferDto): Promise<Olx> {
    const existingOlxOffer = await this.olxRepository.findOne({ where: { id } });

    if (!existingOlxOffer) {
      throw new NotFoundException(`Offer with id ${id} not found`);
    }

    try {
      this.olxRepository.merge(existingOlxOffer, updateOlxOfferDto);
      return await this.olxRepository.save(existingOlxOffer);
    } catch (error: any) {
      if (error.code === '23505' && error.constraint === 'productId_unique') {
        throw new ConflictException('Duplicate productId');
      } else {
        throw error;
      }
    }
  }

  async remove(id: number): Promise<void> {
    const existingOlxOffer = await this.olxRepository.findOne({ where: { id } });

    if (!existingOlxOffer) {
      throw new NotFoundException(`Offer with id ${id} not found`);
    }

    this.olxRepository.remove(existingOlxOffer);
  }
}
