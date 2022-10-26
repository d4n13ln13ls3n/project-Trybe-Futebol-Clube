import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchController = new MatchController();
const router = Router();

router
  .get('/:id', (req, res) => matchController.getMatch(req, res))
  .get('/', (req, res) => matchController.getMatches(req, res));

export default router;
