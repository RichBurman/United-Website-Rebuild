import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private authService = inject(AuthService);

  email = '';
  password = '';

  errorMessage = signal('');
  isLoading = signal(false);
  isLoggedIn = signal(false);

  constructor() {
    this.checkAuthStatus();
  }

  async checkAuthStatus() {
    try {
      const user = await this.authService.getCurrentUser();

      console.log('Current user:', user);
      this.isLoggedIn.set(true);
    } catch {
      this.isLoggedIn.set(false);
    }
  }

  async login() {
    this.errorMessage.set('');
    this.isLoading.set(true);

    try {
      await this.authService.login(this.email, this.password);

      this.isLoggedIn.set(true);

      console.log('Login successful');
    } catch (error) {
      console.error(error);

      this.errorMessage.set('Unable to log in. Check your email and password.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout() {
    try {
      await this.authService.logout();

      this.isLoggedIn.set(false);
      this.email = '';
      this.password = '';

      console.log('Logged out');
    } catch (error) {
      console.error(error);
    }
  }
}
