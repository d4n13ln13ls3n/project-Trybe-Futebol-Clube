import * as express from 'express';
import 'express-async-errors';
import joiErrorHandlerMiddleware from './middlewares/joi-error-handler.middleware';
import LoginRouter from './routes/login.routes';
import UserRouter from './routes/user.routes';
import TeamRouter from './routes/team.routes';
import MatchRouter from './routes/match.routes';
import LeaderboardRouter from './routes/leaderboard.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/login', LoginRouter);
    this.app.use('/users', UserRouter);
    this.app.use('/teams', TeamRouter);
    this.app.use('/matches', MatchRouter);
    this.app.use('/leaderboard', LeaderboardRouter);
    this.app.use(joiErrorHandlerMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
