import jwt from 'jsonwebtoken';
import { jwtSecret } from "./routers";
import { Request, Response, NextFunction } from 'express';
import { token } from 'morgan';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearertoke")) {
      token = authHeader.split(" ")[1];

      jwt.verify(token, jwtSecret,(err, decoded)=>{
        if (err) {
          return res.status(401).json({ message: 'user is unauthorized' });

        }
        
      });

    }
  //   if (!token) {
  //     return res.status(401).json({ message: 'Unauthorized: No token provided' });
  //   }
   
  // console.log(token);
  // console.log(jwtSecret);



  //   if (!decoded) {
  //     return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  //   }


    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
