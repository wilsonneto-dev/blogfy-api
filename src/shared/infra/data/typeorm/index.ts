import { createConnection } from 'typeorm';

try {
  console.log('connecting mongo db...');
  createConnection();
} catch (ex) {
  console.log(ex);
}
