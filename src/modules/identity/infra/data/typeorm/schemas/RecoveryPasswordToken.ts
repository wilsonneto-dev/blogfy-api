import { EntitySchema } from 'typeorm';

import { IRecoveryPasswordTokenDTO } from '@modules/identity/domain/interfaces/repositories/IRecoveryPasswordTokenRepository';

const UserSchema = new EntitySchema<IRecoveryPasswordTokenDTO>({
  name: 'users',
  columns: {
    token: {
      name: 'id',
      type: 'uuid',
      primary: true,
      nullable: false,
      unique: true,
      generated: 'uuid',
      default: 'uuid_generate_v4()',
    },
    userId: {
      name: 'name',
      type: 'varchar',
      nullable: false,
    },
    date: {
      name: 'created_at',
      type: 'timestamp',
      default: 'now()',
    },
  },
});

export default UserSchema;
