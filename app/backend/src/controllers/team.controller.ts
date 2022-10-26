import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class UserController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  async getTeams(req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.getTeams();
    console.log('teams inside controller:', teams);
    if (!teams) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
    return res.status(200).json(teams);
  }
}
