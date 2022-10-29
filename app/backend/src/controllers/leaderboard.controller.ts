import { Request, Response } from 'express';
// import NotFoundHttpError from '../errors/httpErrors/NotFound';
import LeaderboardService from '../services/leaderboard.service';
// import TeamModel from '../database/models/Teams';
// import MatchModel from '../database/models/Matches';
// import UnprocessableEntity from '../errors/httpErrors/UnprocessableEntity';

export default class UserController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  async getHomeLeaderboard(req: Request, res: Response): Promise<Response> {
    const homeLeaderboard = await this.leaderboardService.getHomeLeaderboard();
    return res.status(200).json(homeLeaderboard);
  }

  async getAwayLeaderboard(req: Request, res: Response): Promise<Response> {
    const awayLeaderboard = await this.leaderboardService.getAwayLeaderboard();
    return res.status(200).json(awayLeaderboard);
  }

  async getGeneralLeaderboard(req: Request, res: Response): Promise<Response> {
    const generalLeaderboard = await this.leaderboardService.getGeneralLeaderboard();
    return res.status(200).json(generalLeaderboard);
  }
}
