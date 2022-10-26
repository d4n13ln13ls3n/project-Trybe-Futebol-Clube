import { Request, Response } from 'express';
import NotFoundHttpError from '../errors/httpErrors/NotFound';
import MatchService from '../services/match.service';

export default class UserController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async getMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    console.log('q:', inProgress);
    const allMatches = await this.matchService.getMatches();
    // console.log('matches inside controller:', allMatches);
    if (!allMatches) {
      throw new Error('Something went wrong');
    }
    if (!inProgress) {
      return res.status(200).json(allMatches); // req 19
    }

    const filteredMatches = inProgress === 'false'
      ? allMatches.filter((match) => match.inProgress === 0) // req 21
      : allMatches.filter((match) => match.inProgress === 1); // req 20

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
