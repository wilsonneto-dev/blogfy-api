import { EntitySchema } from 'typeorm';

import User from '@modules/identity/domain/entities/User';

const UserSchema = new EntitySchema<
  User & {
    createdAt?: Date;
    updatetAt?: Date;
  }
>({
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
  relations: {
    workspaces: {
      target: 'workspaces',
      type: 'many-to-many',
      joinTable: {
        name: 'users_workspaces',
        joinColumns: [{ name: 'userId' }],
        inverseJoinColumns: [{ name: 'workspaceId' }],
      },
    },
  },
});

export default UserSchema;
