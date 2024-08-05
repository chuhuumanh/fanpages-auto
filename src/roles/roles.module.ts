import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RelationalRolesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalRolesPersistenceModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, RelationalRolesPersistenceModule],
})
export class RolesModule {}
