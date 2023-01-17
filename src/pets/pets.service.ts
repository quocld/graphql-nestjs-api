import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from '../owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); // create new Pet
    return this.petsRepository.save(newPet); // Insert into database
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); //SELECT * FROM PET
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
