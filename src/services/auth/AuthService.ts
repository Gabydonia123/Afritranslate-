import { User, AuthSession } from '../../types';

const TOKEN_KEY = 'indigenous_auth_token';
const USER_KEY = 'indigenous_auth_user';

class AuthService {
  private currentToken: string | null = null;
  private currentUser: User | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.currentToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
      if (storedUser) {
        try {
          this.currentUser = JSON.parse(storedUser);
        } catch {
          this.currentUser = null;
        }
      }
    }
  }

  getToken(): string | null {
    return this.currentToken;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return Boolean(this.currentToken && this.currentUser);
  }

  async register(email: string, password: string, name?: string, rememberMe = true): Promise<AuthSession> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Registration failed.');
    }

    this.saveSession(data.token, data.user, rememberMe);
    return { token: data.token, user: data.user };
  }

  async login(email: string, password: string, rememberMe = true): Promise<AuthSession> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Login failed. Please check your credentials.');
    }

    this.saveSession(data.token, data.user, rememberMe);
    return { token: data.token, user: data.user };
  }

  async checkSession(): Promise<User | null> {
    if (!this.currentToken) return null;

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${this.currentToken}`,
        },
      });

      if (!response.ok) {
        this.clearSession();
        return null;
      }

      const data = await response.json();
      if (data.success && data.user) {
        this.currentUser = data.user;
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return data.user;
      }

      this.clearSession();
      return null;
    } catch {
      // Offline fallback: keep cached user if present
      return this.currentUser;
    }
  }

  logout(): void {
    if (this.currentToken) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.currentToken}`,
        },
      }).catch(() => {});
    }
    this.clearSession();
  }

  private saveSession(token: string, user: User, rememberMe: boolean): void {
    this.currentToken = token;
    this.currentUser = user;

    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  private clearSession(): void {
    this.currentToken = null;
    this.currentUser = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }
}

export const authService = new AuthService();
