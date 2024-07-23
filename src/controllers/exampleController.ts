import type { NextFunction, Request, Response } from 'express';

export const getExample = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.send('This is an example controller');
  } catch (error) {
    next(error);
  }
};
