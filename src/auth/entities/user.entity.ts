import { ApiProperty } from '@nestjs/swagger'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
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

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert()
  }
}
