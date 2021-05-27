// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import app from '@shared/api/http/app';

describe('/accounts [POST]', () => {
  it('shoud create a new account', done => {
    request(app)
      .post('/accounts')
      .field('name', 'User Test')
      .field('email', 'email@test.com')
      .field('password', 'f7xdgd7fdf7g6')
      .field('workspace', 'workspace')
      .field('workspaceURL', 'workspace_url')
      .expect(200)
      .end(err => {
        if (err) return done(err);
        return done();
      });
  });
});
