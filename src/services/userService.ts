import { User } from '../models/user';

// Simulating a database
let users: User[] = [];

export const userService = {
  findAll: (): User[] => {
    return users;
  },

  create: (name: string, email: string): User => {
    const newUser: User = {
      id: Date.now(), // Simple ID generation
      name,
      email
    };
    users.push(newUser);
    return newUser;
  },
  
  // Helper for testing: clear the database
  clear: () => {
    users = [];
  }
};
