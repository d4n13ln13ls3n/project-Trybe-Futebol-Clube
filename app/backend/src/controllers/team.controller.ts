import { Request, Response } from 'express';
import NotFoundHttpError from '../errors/httpErrors/NotFound';
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

  async getTeam(req: Request, res: Response): Promise<Response | NotFoundHttpError> {
    const { id } = req.params;
    console.log('id:', id);
    const team = await this.teamService.getTeam(Number(id));
    console.log('team inside controller:', team);
    if (!team) {
      throw new NotFoundHttpError('Team does not exist');
    }
    return res.status(200).json(team);
  }
}
