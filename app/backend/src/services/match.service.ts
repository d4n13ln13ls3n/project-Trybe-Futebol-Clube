/* eslint-disable class-methods-use-this */
import { Match, MatchPayload } from '../interfaces';
import MatchModel from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchService {
  async getMatches(): Promise<Match[]> {
    const matches = await MatchModel.findAll({
      include: [
        { model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        { model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  async getMatch(id: number): Promise<Match> {
    const match = await MatchModel.findByPk(id);
    console.log('match inside service:', match);
    return match as Match;
  }

  async saveMatchAsInProgress(match: MatchPayload): Promise<MatchPayload> {
    console.log('entered service');
    const newMatch = await MatchModel.create({ ...match, inProgress: true }, { raw: true });
    console.log('new match inside service:', newMatch);
    return newMatch;
  }

  // async filterMatchesByQuery(query: string): Promise<Match> {
  //   const allMatches = await MatchModel.findAll();
  //   const filteredMatches = query === 'inProgress?=false'
  //     ? allMatches.filter((match) => match.inProgress === 0) // req 21
  //     : allMatches.filter((match) => match.inProgress === 1); // req 20
  //     return filteredMatches;
  // }

  // async find(filter?: Filter): Promise<Match> {
  //   const allMatches = await MatchModel.findAll();

  //   if(filter) {
  //      return allMatches.filter((match) => match.inProgress === filter.inProgress));
  //   }

  //   return allMatches;
  // }
}
