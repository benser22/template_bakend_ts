// export class Server {
//   public app: any;

//   constructor() {}

//   port: number = 3000;

//   listen() {
//     this.app.listen(this.port, () => {
//       console.log(`Servidor corriendo en el puerto ${this.port}`);
//     });
//   }
// }

import express from 'express';
import connectToDatabase from './config/database';
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
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api', router);
  }

  async databaseConnection() {
    await connectToDatabase();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
