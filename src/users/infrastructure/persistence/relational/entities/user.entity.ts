import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'users',
})
export class UserEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'role_id' })
  roleId: string;

  @Column('varchar', { name: 'facebook_id' })
  facebookId: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @ApiProperty()
  @Column('timestamp', {
    name: 'created_timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty()
  @Column('timestamp', { name: 'updated_timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_timestamp' })
  deletedAt: Date;
}
