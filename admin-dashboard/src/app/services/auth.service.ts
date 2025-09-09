import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token?: string;
  accessToken?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = environment.auth.storageKey;
  private readonly TOKEN_KEY = environment.auth.tokenKey;
  private readonly USER_KEY = environment.auth.userKey || 'auth_user';
  private readonly LOGIN_URL = environment.auth.loginUrl;

  private _loggedIn$ = new BehaviorSubject<boolean>(this.readFromStorage());
  private _user$ = new BehaviorSubject<any | null>(this.readUserFromStorage());

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) {}

  get loggedIn$(): Observable<boolean> {
    return this._loggedIn$.asObservable();
  }

  get user$(): Observable<any | null> {
    return this._user$.asObservable();
  }

  get isLoggedIn(): boolean {
    return this._loggedIn$.getValue();
  }

  login(username: string, password: string): Observable<boolean> {
    const email = username?.trim();
    const pwd = password?.trim();
    if (!email || !pwd) {
      return of(false);
    }

    return this.http
      .post<LoginResponse>(this.LOGIN_URL, { email, password: pwd })
      .pipe(
        tap(res => {
          const token = res?.token || res?.accessToken;
          if (token) {
            try { localStorage.setItem(this.TOKEN_KEY, token); } catch {}
          }
          const user = (res as any)?.user || (res as any)?.data?.user || null;
          if (user) {
            this.setUser(user);
          } else {
            // if backend doesn't send user, ensure we clear previous one
            this.setUser(null);
          }
        }),
        map(() => {
          this.writeToStorage(true);
          this._loggedIn$.next(true);
          return true;
        }),
        catchError((_err) => {
          // Optionally log error
          this.writeToStorage(false);
          this._loggedIn$.next(false);
          this.setUser(null);
          return of(false);
        })
      );
  }

  logout(): void {
    try { localStorage.removeItem(this.TOKEN_KEY); } catch {}
    try { localStorage.removeItem(this.USER_KEY); } catch {}
    this.writeToStorage(false);
    this._loggedIn$.next(false);
    this._user$.next(null);
  }

  getToken(): string | null {
    try { return localStorage.getItem(this.TOKEN_KEY); } catch { return null; }
  }

  getUser(): any | null {
    return this._user$.getValue();
  }

  setUser(user: any | null): void {
    this._user$.next(user);
    try {
      if (user) localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(this.USER_KEY);
    } catch { /* ignore */ }
  }

  private readFromStorage(): boolean {
    try {
      return localStorage.getItem(this.STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }

  private writeToStorage(value: boolean): void {
    try {
      if (value) localStorage.setItem(this.STORAGE_KEY, '1');
      else localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  }

  private readUserFromStorage(): any | null {
    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
