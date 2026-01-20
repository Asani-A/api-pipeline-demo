import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {
  getUsers: (req: Request, res: Response) => {
    const users = userService.findAll();
    res.json(users);
  },

  createUser: (req: Request, res: Response) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
      return; // Ensure we stop execution here
    }

    const newUser = userService.create(name, email);
    res.status(201).json(newUser);
  }
};
