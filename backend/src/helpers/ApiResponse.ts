import { Response } from 'express';

const success = (res: Response, message: string, data: any = {}) =>
  res.status(200).json({ message, data });

const notFound = (res: Response, message: string, data: any = {}) =>
  res.status(404).json({ message, data });

const validationError = (res: Response, message: string, data: any = {}) =>
  res.status(400).json({ message, data });

const unauthorized = (res: Response, message: string, data: any = {}) =>
  res.status(401).json({ message, data });

const internalError = (res: Response, message: string, data: any = {}) =>
  res.status(500).json({ message, data });

export default {
  success,
  notFound,
  validationError,
  unauthorized,
  internalError,
};
