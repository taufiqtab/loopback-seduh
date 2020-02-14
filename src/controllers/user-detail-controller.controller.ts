import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {UserDetail} from '../models';
import {UserDetailRepository} from '../repositories';

export class UserDetailControllerController {
  constructor(
    @repository(UserDetailRepository)
    public userDetailRepository : UserDetailRepository,
  ) {}

  @post('/user-details', {
    responses: {
      '200': {
        description: 'UserDetail model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserDetail)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDetail, {
            title: 'NewUserDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    userDetail: Omit<UserDetail, 'id'>,
  ): Promise<UserDetail> {
    return this.userDetailRepository.create(userDetail);
  }

  @get('/user-details/count', {
    responses: {
      '200': {
        description: 'UserDetail model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UserDetail)) where?: Where<UserDetail>,
  ): Promise<Count> {
    return this.userDetailRepository.count(where);
  }

  @get('/user-details', {
    responses: {
      '200': {
        description: 'Array of UserDetail model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserDetail, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserDetail)) filter?: Filter<UserDetail>,
  ): Promise<UserDetail[]> {
    return this.userDetailRepository.find(filter);
  }

  @patch('/user-details', {
    responses: {
      '200': {
        description: 'UserDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDetail, {partial: true}),
        },
      },
    })
    userDetail: UserDetail,
    @param.query.object('where', getWhereSchemaFor(UserDetail)) where?: Where<UserDetail>,
  ): Promise<Count> {
    return this.userDetailRepository.updateAll(userDetail, where);
  }

  @get('/user-details/{id}', {
    responses: {
      '200': {
        description: 'UserDetail model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserDetail, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(UserDetail)) filter?: Filter<UserDetail>
  ): Promise<UserDetail> {
    return this.userDetailRepository.findById(id, filter);
  }

  @patch('/user-details/{id}', {
    responses: {
      '204': {
        description: 'UserDetail PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDetail, {partial: true}),
        },
      },
    })
    userDetail: UserDetail,
  ): Promise<void> {
    await this.userDetailRepository.updateById(id, userDetail);
  }

  @put('/user-details/{id}', {
    responses: {
      '204': {
        description: 'UserDetail PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userDetail: UserDetail,
  ): Promise<void> {
    await this.userDetailRepository.replaceById(id, userDetail);
  }

  @del('/user-details/{id}', {
    responses: {
      '204': {
        description: 'UserDetail DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userDetailRepository.deleteById(id);
  }
}
