import { ApiProperty } from '@nestjs/swagger'
import { OriginWebsite } from 'src/types/originWebsites.enum'
import { UpdateFrecuency } from 'src/types/updateFrecuency.enum'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserListing } from './user-listing.entity'

@Entity('listings')
export class Listing {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { unique: true })
  @ApiProperty()
  url: string

  @Column('enum', { enum: OriginWebsite })
  @ApiProperty({ enum: OriginWebsite })
  website: OriginWebsite

  @Column('enum', { enum: UpdateFrecuency, default: UpdateFrecuency['24HRS'] })
  @ApiProperty({ enum: UpdateFrecuency })
  updateFrecuency: UpdateFrecuency

  @ApiProperty()
  @OneToMany(() => UserListing, (userListing) => userListing.listing)
  userListings: UserListing[]
}
