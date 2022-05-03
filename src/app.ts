import express, { json } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import router from './routers/index.js';
import { handleErrorMiddleware } from './middlewares/handleErrorMiddleware.js';

dotenv.config()

const app = express()

app.use(json())
app.use(cors())
app.use(router)
app.use(handleErrorMiddleware)

export default app;