import { Module } from '@nestjs/common';
import { RolesRepository } from '../roles.repository';
import { RolesRelationalRepository } from './repositories/roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [
    {
      provide: RolesRepository,
      useClass: RolesRelationalRepository,
    },
  ],
  exports: [RolesRepository],
})
export class RelationalRolesPersistenceModule {}
