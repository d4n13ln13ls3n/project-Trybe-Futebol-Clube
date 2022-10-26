import { Request, Response } from 'express';
import NotFoundHttpError from '../errors/httpErrors/NotFound';
import MatchService from '../services/match.service';

export default class UserController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async getMatches(req: Request, res: Response): Promise<Response> {
    const { q } = req.query;
    const allMatches = await this.matchService.getMatches();
    console.log('matches inside controller:', allMatches);
    if (!allMatches) {
      throw new Error('Something went wrong');
    }
    if (!q) {
      return res.status(200).json(allMatches);
    }

    const filteredMatches = q === 'false' ? allMatches.filter((match) => match.inProgress === 0)
      : allMatches.filter((match) => match.inProgress === 1);

    return res.status(200).json(filteredMatches);
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
