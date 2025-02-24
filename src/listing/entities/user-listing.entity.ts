import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/auth/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Listing } from './listing.entity'
import { UpdateFrecuency } from 'src/types/updateFrecuency.enum'

@Entity('users_listings')
export class UserListing {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.listings)
  user: User

  @ApiProperty()
  @ManyToOne(() => Listing, (listing) => listing.userListings)
  listing: Listing

  @ApiProperty()
  @Column('enum', { enum: UpdateFrecuency })
  updateFrecuency: UpdateFrecuency
}
