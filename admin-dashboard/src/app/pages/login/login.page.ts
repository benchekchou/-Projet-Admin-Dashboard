import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  error: string | null = null;
  loading = false;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  submit() {
    this.error = null;
    const v = this.form.value;
    this.loading = true;
    this.auth.login(v.username || '', v.password || '').subscribe({
      next: (ok) => {
        this.loading = false;
        if (ok) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.error = 'Identifiants invalides';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Erreur de connexion au serveur';
      }
    });
  }
}
