// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import app from '@shared/api/http/app';

describe('/accounts [POST]', () => {
  it('shoud create a new account', async done => {
    const response = await request(app).post('/accounts').send({
      name: 'Wilson Neto',
      email: 'teste@test.com',
      password: '123654789',
      workspace: 'workfdgspacenovo',
      workspaceURL: 'wdfgorkspacenovo',
    });

    expect(response.statusCode).toBe(200);
  });
});
