import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/Matches';
import LeaderboardController from '../controllers/leaderboard.controller';
import { Match } from '../interfaces';
import homeLeaderboard from '../utils/helperHomeLeaderboard';

import { app } from '../app';

import MatchService from '../services/match.service';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Testing the leaderboard route', () => {
  afterEach(
    sinon.restore
  );

  const mockedLeaderboard = [
    {
      "name": "Santos",
      "totalPoints": 9,
      "totalGames": 3,
      "totalVictories": 3,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 9,
      "goalsOwn": 3,
      "goalsBalance": 6,
      "efficiency": "100.00"
    },
    {
      "name": "Palmeiras",
      "totalPoints": 7,
      "totalGames": 3,
      "totalVictories": 2,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 10,
      "goalsOwn": 5,
      "goalsBalance": 5,
      "efficiency": "77.78"
    }];

    const mockedMatches = [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ];

  // it('Successful get request to /matches returns status code 200 and an array of matches', async () => {
  //   sinon.stub(homeLeaderboard, '').resolves(mockedMatches as MatchModel[]);
  //   const httpResponse = await chai.request(app).get('/leaderboard/home');
  //   expect(httpResponse.status).to.equal(200);
  //   expect(httpResponse.body).to.deep.equal(mockedMatches);
  // });

  // it('Successful get request to /matches?inProgress=true returns status code 200 and lists the matches in progress', async () => {
  //   const mockedInProgressMatches = mockedMatches.filter((match) => match.inProgress === 1);
  //   const findAllStub = sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as MatchModel[]);
    
  //   const httpResponse = await chai.request(app).get('/matches?inProgress=true');

  //   expect(httpResponse.status).to.equal(200);
  //   expect(httpResponse.body).to.deep.equal(mockedInProgressMatches);
  // });

  // it('Successful get request to /matches?inProgress=false returns status code 200 and lists the finished matches', async () => {
  //   const mockedFinishedMatches = mockedMatches.filter((match) => match.inProgress === 0);
  //   const findAllStub = sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as MatchModel[]);
    
  //   const httpResponse = await chai.request(app).get('/matches?inProgress=false');

  //   expect(httpResponse.status).to.equal(200);
  //   expect(httpResponse.body).to.deep.equal(mockedFinishedMatches);
  // });

  // it('Unsuccessful get request to /matches returns status code 404 and an error message', async () => {
  //   sinon.stub(MatchModel, 'findByPk').resolves(null);

  //   const httpResponse = await chai.request(app).get('/matches/2');
    
  //   expect(httpResponse.status).to.equal(404);
  //   expect(httpResponse.body).to.deep.equal({ message: 'Match does not exist' });
  // });

});