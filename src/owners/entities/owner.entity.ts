import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { Pet } from 'src/pets/pet.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @IsAlpha()
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  shop: string;

  @OneToMany(() => Pet, (pet: Pet) => pet.owner)
  @Field((type) => [Pet], { nullable: true })
  public pets?: Pet[];
}
