import { Request, Response } from 'express';
import NotFoundHttpError from '../errors/httpErrors/NotFound';
import MatchService from '../services/match.service';

export default class UserController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async getMatches(req: Request, res: Response): Promise<Response> {
    const matches = await this.matchService.getMatches();
    console.log('matches inside controller:', matches);
    if (!matches) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
    return res.status(200).json(matches);
  }

  async getMatch(req: Request, res: Response): Promise<Response | NotFoundHttpError> {
    const { id } = req.params;
    console.log('id:', id);
    const match = await this.matchService.getMatch(Number(id));
    console.log('match inside controller:', match);
    if (!match) {
      throw new NotFoundHttpError('Match does not exist');
    }
    return res.status(200).json(match);
  }
}
