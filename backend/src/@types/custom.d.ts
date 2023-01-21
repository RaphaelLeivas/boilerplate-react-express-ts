import { Express } from 'express-serve-static-core';
import { TokenInterface } from './auth.type';

declare module 'express-serve-static-core' {
  interface Request {
    user: TokenInterface;
  }
}
