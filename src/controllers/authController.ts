import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, firstName, lastName, company } = req.body;

  try {
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, firstName, lastName, company });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ 
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};