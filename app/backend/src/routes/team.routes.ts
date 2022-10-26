import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();
const router = Router();

router
  .get('/', (req, res) => teamController.getTeams(req, res));

export default router;
