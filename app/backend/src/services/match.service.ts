/* eslint-disable class-methods-use-this */
import { Match } from '../interfaces';
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
}
