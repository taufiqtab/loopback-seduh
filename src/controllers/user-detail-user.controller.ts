import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserDetail,
  User,
} from '../models';
import {UserDetailRepository} from '../repositories';

export class UserDetailUserController {
  constructor(
    @repository(UserDetailRepository)
    public userDetailRepository: UserDetailRepository,
  ) { }

  @get('/user-details/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to UserDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof UserDetail.prototype.id,
  ): Promise<User> {
    return this.userDetailRepository.user(id);
  }
}
