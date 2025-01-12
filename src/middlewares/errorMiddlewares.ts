import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate key error: ${field} already exists.`;
    res.status(400).json({ error: message });
  } else {
    res.status(500).json({ error: err.message });
  }
};

export default errorMiddleware;