import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateListingDto } from './dto/create-listing.dto'
import { UpdateListingDto } from './dto/update-listing.dto'
import { Listing } from './entities/listing.entity'
import { UserListing } from './entities/user-listing.entity'
import { User } from 'src/auth/entities/user.entity'

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(UserListing)
    private readonly userListingRepository: Repository<UserListing>,
  ) {}

  async create(createListingDto: CreateListingDto, user: User) {
    let existingListing = await this.listingRepository.findOne({
      where: { url: createListingDto.url },
    })

    if (existingListing) {
      await this.registerUserListing(existingListing, user, createListingDto)
    } else {
      existingListing = await this.listingRepository.save(createListingDto)
    }

    return this.userListingRepository.save({
      listing: existingListing,
      user,
      updateFrecuency: createListingDto.updateFrecuency,
    })
  }

  async registerUserListing(existingListing, user, createListingDto) {
    const existingUserListing = await this.userListingRepository.findOne({
      where: { listing: { id: existingListing.id }, user: { id: user.id } },
    })

    if (existingUserListing) {
      throw new BadRequestException('Listing already exists')
    } else if (existingListing.updateFrecuency > createListingDto.updateFrecuency) {
      existingListing.updateFrecuency = createListingDto.updateFrecuency
      await this.listingRepository.save(existingListing)
    }
  }

  findAllListingsByUser(user: User) {
    return this.userListingRepository.find({
      where: { user: { id: user.id } },
      relations: ['listing'],
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`
  }

  remove(id: number) {
    return `This action removes a #${id} listing`
  }
}
