import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { AppointmentService } from './appointment.service';
import { AuthService } from './auth.service';

describe('AppointmentService', () => {
  let httpMock: HttpTestingController;
  let appointmentService: AppointmentService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    appointmentService = TestBed.inject(AppointmentService);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
    authService.logout();
  });

  it('posts the booking fields expected by the backend with the JWT', async () => {
    const login = firstValueFrom(
      authService.login({ email: 'cliente@example.com', password: 'secreto123' }),
    );
    httpMock.expectOne('http://localhost:8080/api/auth/login').flush({
      success: true,
      mensaje: 'OK',
      token: 'test-token',
    });
    await login;

    const booking = firstValueFrom(
      appointmentService.createAppointment({
        fecha: '2026-10-20',
        horaInicio: '14:30',
        servicioId: 45,
        idComercio: 12,
      }),
    );
    const request = httpMock.expectOne('http://localhost:8080/turnos');

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test-token');
    expect(request.request.body).toEqual({
      fecha: '2026-10-20',
      horaInicio: '14:30',
      servicioId: 45,
      idComercio: 12,
    });
    request.flush({
      idTurno: 5,
      fecha: '2026-10-20',
      horaInicio: '14:30',
      horaFin: '15:00',
      estado: 'PENDIENTE',
      usuarioId: 3,
      servicioId: 45,
      cancelacionId: null,
      idComercio: 12,
    });
    await booking;
  });
});
