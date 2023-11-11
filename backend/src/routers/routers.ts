import express, { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
const router = express.Router();
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(cookieParser());

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from "../routers/middleware.routers";
export const jwtSecret = '&41@3659Foisal';

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [
          { name },
          { email },
        ],
      },
    });

    if (existingStudent) {
      return res.status(400).json({
        error: 'User with the same username or email that already exists.',
      });
    }

    const creatingStudent = await prisma.student.create({
      data: {
        name: name,
        email: email,
        password: hash,

      },
    });

    //generating the cookie
    const token = jwt.sign(
      { name: creatingStudent.name, email: creatingStudent.email }, jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({
      student: creatingStudent,
      token: token
    });


  } catch (error) {
    res.status(500).json({ error: 'Failed to create student.' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const existingStudentDetails = await prisma.student.findFirst({
      where: {
        OR: [
          { name },
          { password },
        ],
      },
    });

    if (!existingStudentDetails) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    const isvalidPassword = await bcrypt.compare(
      password,
      existingStudentDetails.password
    );
    if (!isvalidPassword) {
      res.status(401).json({
        message: 'Sorry, not valid',
      });
    } else {

      const token = jwt.sign(
        { name: existingStudentDetails.name, email: existingStudentDetails.email }, jwtSecret, {
        expiresIn: '1h',
      });

      //cookie section
      const options = {
        expires: new Date(Date.now()+2*24*60*60*1000),
        httpOnly:true,
      };
      res.status(200).cookie("token",token,options).json({
        message:"Done the cookie part successfully",
        token
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.get('/',authenticateJWT, async (req: Request, res: Response) => {
  try {
    const allStudents = await prisma.student.findMany({});
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve students.' });
  }
});


router.get('/:id',authenticateJWT,  async (req: Request, res: Response) => {
  try {
    const studentID = parseInt(req.params.id);
    const user = await prisma.student.findUnique({
      where: {
        id: studentID,
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve student.' });
  }
});

export default router;
