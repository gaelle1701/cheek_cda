import { Session } from '../entities/Session';
import { AppDataSource } from '../config/data-source';

export const sessionRepository = AppDataSource.getRepository(Session);
