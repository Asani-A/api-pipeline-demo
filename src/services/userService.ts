import { User } from '../models/user';
import { publishUserCreated } from './mqService';

// Simulating a database
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

export const getAllUsers = (): User[] => {
  return users;
};

export const createUser = (name: string, email: string): User => {
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  
  // FIRE THE EVENT
  publishUserCreated(newUser);
  
  return newUser;
};
