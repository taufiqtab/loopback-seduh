import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {KulkasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.kulkas') dataSource: KulkasDataSource,
  ) {
    super(User, dataSource);
  }
}
