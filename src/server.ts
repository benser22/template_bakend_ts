import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import connectToDatabase from './config/database';
import { notFound } from './middlewares';
import router from './routes';

export class Server {
  public app: express.Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middlewares();
    this.routes();
    this.databaseConnection();
    this.errorHandling();
  }

  middlewares() {
    this.app.use(helmet());

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100,
      message: 'Too many requests from this IP, please try again later',
    });
    this.app.use(limiter);

    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', router);
    this.app.use(notFound);
  }

  async databaseConnection() {
    // Descomentar para conexión a la base de datos
    // await connectToDatabase();
  }

  errorHandling() {
    this.app.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
      },
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
