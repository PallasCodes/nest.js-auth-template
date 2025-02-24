import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ListingService } from './listing.service'
import { CreateListingDto } from './dto/create-listing.dto'
import { UpdateListingDto } from './dto/update-listing.dto'
import { Auth, GetUser } from 'src/auth/decorators'
import { User } from 'src/auth/entities/user.entity'

@Auth()
@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  create(@Body() createListingDto: CreateListingDto, @GetUser() user: User) {
    return this.listingService.create(createListingDto, user)
  }

  @Get()
  findAll() {
    return this.listingService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingService.update(+id, updateListingDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingService.remove(+id)
  }
}
