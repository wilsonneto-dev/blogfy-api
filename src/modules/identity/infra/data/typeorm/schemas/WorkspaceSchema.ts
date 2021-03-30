import { EntitySchema } from 'typeorm';

import Workspace from '@modules/identity/domain/entities/Workspace';

const WorkspaceSchema = new EntitySchema<Workspace>({
  name: 'workspace',
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
    url: {
      name: 'url',
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

export default WorkspaceSchema;
