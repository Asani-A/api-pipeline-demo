import { Request, Response } from 'express';
import * as userService from '../services/userService'; 

export const getUsers = (req: Request, res: Response) => {
  // Fix: Call "getAllUsers", not "findAll"
  const users = userService.getAllUsers();
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Fix: Call "createUser", not "create"
  const newUser = userService.createUser(name, email);
  res.status(201).json(newUser);
};
