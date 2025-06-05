import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
