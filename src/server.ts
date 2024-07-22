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

// src/server.ts
import express from 'express'
import mongoose from 'mongoose'
import router from './routes'

export class Server {
  public app: express.Application
  private port: string | number
  private mongoUri: string

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.mongoUri =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase'

    this.middlewares()
    this.routes()
    this.databaseConnection()
  }

  middlewares() {
    this.app.use(express.json())
  }

  routes() {
    this.app.use('/api', router)
  }

  async databaseConnection() {
    try {
      await mongoose.connect(this.mongoUri, {
        // Las opciones de conexión antiguas se han eliminado
        // El nuevo conector no requiere las opciones `useNewUrlParser` ni `useUnifiedTopology`
        // No obstante, puedes agregar opciones como `autoIndex` si es necesario
      })
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Database connection error:', error)
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

export default Server
