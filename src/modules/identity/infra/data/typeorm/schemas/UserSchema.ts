import { EntitySchema } from 'typeorm';

import User from '@modules/identity/domain/entities/User';

const UserSchema = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      nullable: false,
      unique: true,
      generated: 'uuid',
      default: 'uuid_generate_v4()',
    },
    name: {
      name: 'name',
      type: 'varchar',
      nullable: false,
    },
    email: {
      name: 'email',
      type: 'varchar',
      nullable: false,
    },
    password: {
      name: 'password',
      type: 'varchar',
      nullable: false,
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      default: 'now()',
    },
    updatetAt: {
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()',
    },
  },
});

export default UserSchema;
