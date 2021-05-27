// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import app from '@shared/api/http/app';

describe('/ [GET]', () => {
  it('shoud respond with a 200 OK', done => {
    request(app)
      .get('/')
      .expect(200)
      .end(err => {
        if (err) return done(err);
        return done();
      });
  });
});
