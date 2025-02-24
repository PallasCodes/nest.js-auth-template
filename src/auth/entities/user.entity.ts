import { ApiProperty } from '@nestjs/swagger'
import { Listing } from 'src/listing/entities/listing.entity'
import { UserListing } from 'src/listing/entities/user-listing.entity'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column('text')
  username: string

  @ApiProperty()
  @Column('text', { unique: true })
  email: string

  @ApiProperty()
  @Column('text', { select: false })
  password: string

  @ApiProperty()
  @Column('text', { array: true, default: ['user'] })
  roles: string[]

  @ApiProperty()
  @OneToMany(() => UserListing, (userListing) => userListing.user)
  listings: UserListing[]

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert()
  }
}
