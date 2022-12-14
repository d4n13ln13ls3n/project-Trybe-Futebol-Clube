import { Request, Response } from 'express';
import NotFoundHttpError from '../errors/httpErrors/NotFound';
import MatchService from '../services/match.service';
import TeamModel from '../database/models/Teams';
import UnprocessableEntity from '../errors/httpErrors/UnprocessableEntity';

export default class UserController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async getMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    // const filter = inProgress !== undefined ? { inProgress } : undefined;
    // const matches = await this.matchService.find(filter);
    console.log('q:', inProgress);
    const allMatches = await this.matchService.getMatches();
    if (!inProgress) {
      return res.status(200).json(allMatches); // req 19
    }

    const filteredMatches = inProgress === 'false'
      ? allMatches.filter((match) => match.inProgress === false)
      : allMatches.filter((match) => match.inProgress === true);

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

  async saveMatchAsInProgress(req: Request, res: Response): Promise<Response> {
    const newMatch = req.body;
    const doesHomeTeamExist = await TeamModel.findByPk(newMatch.homeTeam);
    const doesAwayTeamExist = await TeamModel.findByPk(newMatch.awayTeam);

    if (!doesAwayTeamExist || !doesHomeTeamExist) {
      throw new NotFoundHttpError('There is no team with such id!');
    }

    if (newMatch.homeTeam === newMatch.awayTeam) {
      throw new UnprocessableEntity('It is not possible to create a match with two equal teams');
    }

    delete newMatch.user;
    const matchToSave = await this.matchService.saveMatchAsInProgress(newMatch);
    return res.status(201).json(matchToSave);
  }

  async saveMatchAsFinished(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.matchService.patchMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async saveScoreInProgressMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.saveScoreInProgressMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Updated score' });
  }
}
