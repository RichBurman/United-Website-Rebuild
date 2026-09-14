import { Injectable } from '@angular/core';

import { account } from '../appwrite';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string) {
    return account.createEmailPasswordSession({
      email,
      password,
    });
  }

  logout() {
    return account.deleteSession({
      sessionId: 'current',
    });
  }

  getCurrentUser() {
    return account.get();
  }
}