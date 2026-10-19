import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
    authService.logout();
  });

  it('logs in and stores the JWT used on subsequent API requests', async () => {
    const login = firstValueFrom(authService.login({ email: 'cliente@example.com', password: 'secreto123' }));
    const loginRequest = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush({ success: true, mensaje: 'OK', token: 'test-token' });
    await login;

    expect(authService.isAuthenticated()).toBe(true);
    expect(authService.getToken()).toBe('test-token');

    const catalogRequestPromise = firstValueFrom(
      TestBed.inject(HttpClient).get('http://localhost:8080/api/comercios'),
    );
    const catalogRequest = httpMock.expectOne('http://localhost:8080/api/comercios');
    expect(catalogRequest.request.headers.get('Authorization')).toBe('Bearer test-token');
    catalogRequest.flush([]);
    await catalogRequestPromise;
  });

  it('registers a customer and signs them in', async () => {
    const registration = firstValueFrom(
      authService.register({
        nombre: 'Ana',
        apellido: 'Gomez',
        email: 'ana@example.com',
        password: 'secreto123',
      }),
    );
    const registrationRequest = httpMock.expectOne('http://localhost:8080/api/auth/register');
    expect(registrationRequest.request.method).toBe('POST');
    registrationRequest.flush('Usuario registrado con éxito.');

    const loginRequest = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(loginRequest.request.body).toEqual({ email: 'ana@example.com', password: 'secreto123' });
    loginRequest.flush({ success: true, mensaje: 'OK', token: 'registered-token' });

    await registration;
    expect(authService.isAuthenticated()).toBe(true);
  });
});
