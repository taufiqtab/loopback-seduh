import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { UserDetail, UserDetailRelations, User } from '../models';
import { KulkasDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UserRepository } from './user.repository';

export class UserDetailRepository extends DefaultCrudRepository<
  UserDetail,
  typeof UserDetail.prototype.id,
  UserDetailRelations
  > {

  public readonly user: BelongsToAccessor<User, typeof UserDetail.prototype.id>;

  constructor(
    @inject('datasources.kulkas') dataSource: KulkasDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserDetail, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
