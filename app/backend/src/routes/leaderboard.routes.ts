import { Router } from 'express';
import LeaderboardController from '../controllers/match.controller';

const leaderboardController = new LeaderboardController();
const router = Router();

router
  // .get('/:id', (req, res) => matchController.getMatch(req, res))
  .get('/', (req, res) => leaderboardController.getMatches(req, res));
// .post('/', (req, res) => matchController.saveMatchAsInProgress(req, res))
// .patch('/:id/finish', (req, res) => matchController.saveMatchAsFinished(req, res));
export default router;
