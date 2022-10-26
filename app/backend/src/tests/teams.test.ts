import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import UserModel from '../database/models/Users';
import { Team } from '../interfaces';

import { app } from '../app';

import { Response } from 'superagent';
import TeamModel from '../database/models/Teams';
import LoginService from '../services/team.service';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Testing the teams route', () => {
  afterEach(
    sinon.restore
  );

  const mockedTeams = [
    {
      id: 1, 
      teamName: 'Palmeiras'
    }, 
    { 
      id: 2, 
      teamName: 'Flamengo'
    }];

  it('Successful get request to /teams returns status code 200 and an array of teams', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(mockedTeams as TeamModel[]);
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockedTeams);
  });

  it('Successful get request to /teams/:id returns status code 200 and the desired team', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(mockedTeams[0] as TeamModel);
    const httpResponse = await chai.request(app).get('/teams/1');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockedTeams[0]);
  });

  it('Unsuccessful get request to /teams/:id returns status code 404 and an error message', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(null);
    const httpResponse = await chai.request(app).get('/teams/3');
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.deep.equal({ message: 'Team does not exist' });
  });

});