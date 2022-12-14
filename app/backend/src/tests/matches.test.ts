import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/Matches';
import TeamModel from '../database/models/Teams';
// import MatchController from '../controllers/match.controller';
// import { MatchDTO, Match } from '../interfaces';

import { app } from '../app';
import LoginService from '../services/login.service';

// import { Response } from 'superagent';
// import MatchService from '../services/match.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing the matches route', () => {
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

    const mockedMatch =
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": true,
      };

      const mockedHomeTeam = 
        {
          "id": 16,
          "teamName": "São Paulo"
        };

        const mockedLoginObject = {
          id: 7,
          username: 'Luiz',
          role: 'admin',
          password: 'dafads342',
          email: 'luiz@email.com',
        }
      

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

  it('Successful get request to /matches/:id returns status code 200', async () => {
    sinon.stub(MatchModel, 'findByPk').resolves(mockedMatches[0] as MatchModel);

    const httpResponse = await chai.request(app).get('/matches/1');
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockedMatches[0]);
  });

  it('Successful post request to /matches returns status code 201 and the saved match with inProgress = true', async () => {
    sinon.stub(MatchModel, 'create').resolves(mockedMatches[1] as MatchModel);
    sinon.stub(TeamModel, 'findByPk').resolves(mockedHomeTeam as TeamModel);
    sinon.stub(LoginService, 'validateAccessToken').resolves(mockedLoginObject);

    const httpResponse = await chai.request(app)
      .post('/matches')
      .set('Authorization', 'ntoken')
      .send(mockedMatch);

    console.log('http response:', httpResponse);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.deep.equal(mockedMatches[1]);
  });

});