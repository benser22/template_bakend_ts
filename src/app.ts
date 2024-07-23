// import { Server } from './models/server'

// import dotenv from 'dotenv'
// dotenv.config()

// const server = new Server()
// server.listen()
import dotenv from 'dotenv';
import { Server } from './index';

dotenv.config();

const server = new Server();
server.listen();
