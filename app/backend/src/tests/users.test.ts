import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing the users route', () => {
  describe('When email is not informed', () => {
    it('Must return a status code 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          username: 'any_user',
          role: 'any_role',
          password: 'any_password',
        });
        console.log('http response:', httpResponse);
      expect(httpResponse.status).to.equal(400);
    });
  });

  describe('When username is not informed', () => {
    it('Must return a status code 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          email: 'any_user@email.com',
          role: 'any_role',
          password: 'any_password',
        })
      expect(httpResponse.status).to.equal(400);
    });
  });

  describe('When role is not informed', () => {
    it('Must return a status code 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          email: 'any_user@email.com',
          username: 'any_username',
          password: 'any_password',
        })
      expect(httpResponse.status).to.equal(400);
    });
  });

  describe('When password is not informed', () => {
    it('Must return a status code 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          email: 'any_user@email.com',
          role: 'any_role',
          username: 'any_username',
        })
      expect(httpResponse.status).to.equal(400);
    });
  });

  describe('When all required fields are informed', () => {
    it('Must return a status code 201', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          email: 'any_user@email.com',
          role: 'any_role',
          username: 'any_username',
          password: 'any_password',
        });
        console.log('http response:', httpResponse);
      expect(httpResponse.status).to.equal(201);
    });
  });

});
