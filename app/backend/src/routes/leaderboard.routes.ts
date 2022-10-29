import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();
const router = Router();

router.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
router.get('/away', (req, res) => leaderboardController.getAwayLeaderboard(req, res));
router.get('/', (req, res) => leaderboardController.getGeneralLeaderboard(req, res));

export default router;
