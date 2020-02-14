import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { User, UserRelations, UserDetail } from '../models';
import { KulkasDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UserDetailRepository } from './user-detail.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {


  constructor(
    @inject('datasources.kulkas') dataSource: KulkasDataSource
  ) {
    super(User, dataSource);

  }
}
