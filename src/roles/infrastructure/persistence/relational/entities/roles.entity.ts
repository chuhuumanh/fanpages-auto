import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'roles',
})
export class RolesEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'title' })
  title: string;

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
