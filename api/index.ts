import dotenv from 'dotenv';
import { createApiApp } from '../src/server/app.js';

dotenv.config();

export default createApiApp();
