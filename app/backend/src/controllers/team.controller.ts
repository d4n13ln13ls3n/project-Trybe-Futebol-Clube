import { Request, Response } from 'express';
import BadRequestHttpError from '../errors/httpErrors/BadRequest';
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

  async getTeam(req: Request, res: Response): Promise<Response | BadRequestHttpError> {
    const { id } = req.params;
    console.log('id:', id);
    const team = await this.teamService.getTeam(Number(id));
    console.log('team inside controller:', team);
    if (!team) {
      return new BadRequestHttpError('Team does not exist');
    }
    return res.status(200).json(team);
  }
}
