import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/Matches';
import TeamModel from '../database/models/Teams';
import LeaderboardController from '../controllers/leaderboard.controller';
import { MatchDTO } from '../interfaces';
import homeLeaderboard from '../utils/helperHomeLeaderboard';

import { app } from '../app';

import MatchService from '../services/match.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing the leaderboard route', () => {
  afterEach(
    sinon.restore
  );

  const mockedLeaderboard = [
    {
      "name": "São Paulo",
      "totalPoints": 4,
      "totalGames": 2,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 3,
      "goalsOwn": 1,
      "goalsBalance": 2,
      "efficiency": 66.67
    },
    {
      "name": "Grêmio",
      "totalPoints": 1,
      "totalGames": 1,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 1,
      "goalsOwn": 1,
      "goalsBalance": 0,
      "efficiency": 33.33
    },
    {
      "name": "Internacional",
      "totalPoints": 0,
      "totalGames": 1,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 0,
      "goalsOwn": 2,
      "goalsBalance": -2,
      "efficiency": 0
    }
  ];
  
  const mockedLeaderboardHome = [
    {
      "name": "São Paulo",
      "totalPoints": 4,
      "totalGames": 2,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 3,
      "goalsOwn": 1,
      "goalsBalance": 2,
      "efficiency": 66.67
    }
  ];

  const mockedLeaderboardAway = [
    {
      "name": "Grêmio",
      "totalPoints": 1,
      "totalGames": 1,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 1,
      "goalsOwn": 1,
      "goalsBalance": 0,
      "efficiency": 33.33
    },
    {
      "name": "Internacional",
      "totalPoints": 0,
      "totalGames": 1,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 0,
      "goalsOwn": 2,
      "goalsBalance": -2,
      "efficiency": 0
    },
  ];

  const mockedTeams = [
    {
      "id": 16,
      "teamName": "São Paulo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
  ]

    const mockedHomeTeams = [
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ]

    const mockedAwayTeams = [
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      }
    ]

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
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ];
  
    it('Successful get request to /leaderboard/home returns status code 200 and an array of matches', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as unknown as MatchModel[]);
    sinon.stub(TeamModel, 'findAll').resolves(mockedHomeTeams as unknown as TeamModel[]);
    const httpResponse = await chai.request(app).get('/leaderboard/home');
    console.log('http response:', httpResponse.body);
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockedLeaderboardHome);
    });

    it('Successful get request to /leaderboard/away returns status code 200 and an array of matches', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as unknown as MatchModel[]);
      sinon.stub(TeamModel, 'findAll').resolves(mockedAwayTeams as unknown as TeamModel[]);
      const httpResponse = await chai.request(app).get('/leaderboard/away');
      console.log('http response:', httpResponse.body);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(mockedLeaderboardAway);
      });

    it('Successful get request to /leaderboard/ returns status code 200 and an array of matches', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as unknown as MatchModel[]);
      sinon.stub(TeamModel, 'findAll').resolves(mockedTeams as unknown as TeamModel[]);
      const httpResponse = await chai.request(app).get('/leaderboard');
      console.log('http response:', httpResponse.body);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(mockedLeaderboard);
      }); 
});