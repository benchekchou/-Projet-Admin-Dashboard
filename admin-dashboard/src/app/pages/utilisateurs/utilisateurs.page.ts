import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/services/utilisateurs';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.page.html',
  styleUrls: ['./utilisateurs.page.scss'],
  standalone: false
})
export class UtilisateursPage implements OnInit {
  users: User[] = [];
  editingUser: User | null = null;
  newUser: User = { id: 0, name: '', email: '', role: 'client' };

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  addUser() {
    const name = this.newUser.name?.trim();
    const email = this.newUser.email?.trim();
    const role = this.newUser.role === 'admin' ? 'admin' : 'client';

    if (!name || !email) return;
    // Simple email check
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) return;

    this.userService.addUser({ id: 0, name, email, role });
    this.newUser = { id: 0, name: '', email: '', role: 'client' };
    this.loadUsers();
  }

  startEdit(user: User) {
    // Only editing role per requirements
    this.editingUser = { ...user };
  }

  cancelEdit() {
    this.editingUser = null;
  }

  saveUser() {
    if (!this.editingUser) return;
    // Ensure role is admin/client only
    this.editingUser.role = this.editingUser.role === 'admin' ? 'admin' : 'client';
    this.userService.updateUser(this.editingUser);
    this.editingUser = null;
    this.loadUsers();
  }

  async deleteUser(id: number) {
    const ok = window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
    if (!ok) return;
    this.userService.deleteUser(id);
    this.loadUsers();
  }
}
