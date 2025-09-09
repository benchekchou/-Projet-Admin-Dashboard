import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Utilisateur 1', email: 'user1@example.com', role: 'admin' },
    { id: 2, name: 'Utilisateur 2', email: 'user2@example.com', role: 'client' }
  ];

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index > -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }
}
