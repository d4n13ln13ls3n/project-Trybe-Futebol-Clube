import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../database/models/Users';
import { User } from '../interfaces';

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Users from '../database/models/Users';
import LoginService from '../services/login.service';
import * as bcryptjs from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing the login route', () => {
  afterEach(
    sinon.restore
  );

  it('Successful post request returns status code 200', async () => {
    sinon.stub(UserModel, 'findOne').resolves({
      id: 7,
      username: 'Luiz',
      role: 'admin',
      password: 'dafads342',
      email: 'luiz@email.com',
    } as UserModel);
    sinon.stub(bcryptjs, 'compareSync').callsFake( () => true);
    const httpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'});
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body.token).to.exist;
  });
  
  it('Post request with invalid email returns status code 400', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin.com',
        password: 'secret_admin',
      });
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Post request with invalid password returns status code 401', async () => {
    sinon.stub(UserModel, 'findOne').resolves({
      id: 7,
      username: 'Luiz',
      role: 'admin',
      password: 'dafads342',
      email: 'luiz@email.com',
    } as UserModel);
    sinon.stub(bcryptjs, 'compareSync').callsFake( () => false);

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_adn',
      });
      console.log(httpResponse.body);
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Post request without email returns status code 400', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'secret_admin',
      });
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Post request without password returns status code 400', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
      });
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

});
