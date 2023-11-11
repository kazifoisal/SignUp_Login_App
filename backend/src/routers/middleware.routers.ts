import jwt from 'jsonwebtoken';
import { jwtSecret } from "./routers";
import { Request, Response, NextFunction } from 'express';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  try {
    let token;
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (authHeader && authHeader.startsWith("Bearertoken")) {
      token = authHeader.split(" ")[1];

      jwt.verify(token, jwtSecret,(err)=>{
        if (err) {
          return res.status(401).json({ message: 'user is unauthorized' });

        }
        next();
      });

    }
    else {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }


  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
