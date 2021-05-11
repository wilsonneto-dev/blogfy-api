import { EntitySchema } from 'typeorm';

import { IRecoveryPasswordTokenDTO } from '@modules/identity/domain/interfaces/repositories/IRecoveryPasswordTokenRepository';

const RecoveryPasswordTokenSchema = new EntitySchema<IRecoveryPasswordTokenDTO>(
  {
    name: 'recovery_password_token',
    columns: {
      token: {
        name: 'token',
        type: 'varchar',
        primary: true,
        nullable: false,
        unique: true,
      },
      userId: {
        name: 'user_id',
        type: 'uuid',
        nullable: false,
      },
      date: {
        name: 'date',
        type: 'timestamp',
        default: 'now()',
      },
    },
  },
);

export default RecoveryPasswordTokenSchema;
