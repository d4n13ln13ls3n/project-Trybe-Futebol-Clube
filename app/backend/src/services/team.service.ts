/* eslint-disable class-methods-use-this */
import { Team } from '../interfaces';
import TeamModel from '../database/models/Teams';

export default class TeamService {
  async getTeams(): Promise<Team[]> {
    const teams = await TeamModel.findAll({ raw: true });
    console.log('teams inside service:', teams);
    return teams;
  }

  async getTeam(id: number): Promise<Team> {
    const team = await TeamModel.findByPk(id);
    console.log('team inside service:', team);
    return team as Team;
  }
}
