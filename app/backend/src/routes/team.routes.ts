import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();
const router = Router();

router
  .get('/:id', (req, res) => teamController.getTeam(req, res))
  .get('/', (req, res) => teamController.getTeams(req, res));

export default router;
