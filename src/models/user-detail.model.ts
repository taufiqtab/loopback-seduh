import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User, UserWithRelations } from './user.model';

@model(
  { name: "usr_detail" }
)
export class UserDetail extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @belongsTo(() => User, { name: "user" })
  user_id: number;

  constructor(data?: Partial<UserDetail>) {
    super(data);
  }
}

export interface UserDetailRelations {
  // describe navigational properties here
  user: UserWithRelations
}

export type UserDetailWithRelations = UserDetail & UserDetailRelations;
