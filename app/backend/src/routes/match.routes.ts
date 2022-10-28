import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import accessTokenValidatorMiddleware from '../middlewares/access-token-validator.middleware';
// import LoginService from '../services/login.service';
// import AuthenticationController from 'src/controllers/login.controller';

const matchController = new MatchController();
const router = Router();

router.get('/:id', (req, res) => matchController.getMatch(req, res));
router.get('/', (req, res) => matchController.getMatches(req, res));
router.patch('/:id/finish', (req, res) => matchController.saveMatchAsFinished(req, res));
router.patch('/:id', (req, res) => matchController.saveScoreInProgressMatch(req, res));
router.post(
  '/',
  accessTokenValidatorMiddleware,
  (req, res) => matchController.saveMatchAsInProgress(req, res),
);

export default router;
