import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/Matches';
import MatchController from '../controllers/match.controller';
import { MatchDTO, Match } from '../interfaces';

import { app } from '../app';

import { Response } from 'superagent';
import MatchService from '../services/match.service';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Testing the matches route', () => {
  afterEach(
    sinon.restore
  );

  const mockedMatches = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
    },
    {
      "id": 3,
      "homeTeam": 4,
      "homeTeamGoals": 3,
      "awayTeam": 11,
      "awayTeamGoals": 0,
      "inProgress": true,
    }];

  it('Successful get request to /matches returns status code 200 and an array of matches', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as MatchModel[]);
    const httpResponse = await chai.request(app).get('/matches');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockedMatches);
  });

  it('Successful get request to /matches?inProgress=true returns status code 200 and lists the matches in progress', async () => {
    const mockedInProgressMatches = mockedMatches.filter((match) => match.inProgress === true);
    const findAllStub = sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as MatchModel[]);
    
    const httpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockedInProgressMatches);
  });

  it('Successful get request to /matches?inProgress=false returns status code 200 and lists the finished matches', async () => {
    const mockedFinishedMatches = mockedMatches.filter((match) => match.inProgress === false);
    const findAllStub = sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as MatchModel[]);
    
    const httpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockedFinishedMatches);
  });

  it('Unsuccessful get request to /matches returns status code 404 and an error message', async () => {
    sinon.stub(MatchModel, 'findByPk').resolves(null);

    const httpResponse = await chai.request(app).get('/matches/2');
    
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.deep.equal({ message: 'Match does not exist' });
  });

});