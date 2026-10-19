import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.model';

const TOKEN_KEY = 'turnia_access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  readonly isAuthenticated = signal(this.readToken() !== null);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, request).pipe(
      map((response) => {
        if (!response.success || !response.token) {
          throw new Error(response.mensaje || 'El backend no devolvió un token de acceso.');
        }

        this.saveToken(response.token);
        return response;
      }),
    );
  }

  register(request: RegisterRequest): Observable<LoginResponse> {
    return this.http
      .post(`${environment.apiUrl}/api/auth/register`, request, { responseType: 'text' })
      .pipe(switchMap(() => this.login({ email: request.email, password: request.password })));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
    }

    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return this.readToken();
  }

  private readToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(TOKEN_KEY) : null;
  }

  private saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    this.isAuthenticated.set(true);
  }
}
