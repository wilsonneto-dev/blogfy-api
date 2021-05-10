import { Document } from 'mongoose';

interface IMongooseModelMapper<DomainEntity> {
  toDomainEntity: (mongooseModel: Document<any, {}> | any) => DomainEntity;
  fromDomainEntity: (entity: DomainEntity) => Document<any, {}>;
}

export default IMongooseModelMapper;
