/* eslint-disable class-methods-use-this */
import { Team } from '../interfaces';
import TeamModel from '../database/models/Teams';

export default class TeamService {
  async getTeams(): Promise<Team[]> {
    const teams = await TeamModel.findAll({ raw: true });
    console.log('teams inside service:', teams);
    return teams;
  }
}
