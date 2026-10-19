import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import type { LoginRequest, RegisterRequest } from '../../models/auth.model';
import { getApiErrorMessage } from '../../utils/api-error';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './auth-panel.css',
  templateUrl: './auth-panel.html',
})
export class AuthPanel {
  private readonly authService = inject(AuthService);

  protected readonly isRegistering = signal(false);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  protected email = '';
  protected password = '';
  protected nombre = '';
  protected apellido = '';

  protected toggleMode(): void {
    this.isRegistering.update((registering) => !registering);
    this.errorMessage.set('');
  }

  protected submit(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const request: LoginRequest = {
      email: this.email.trim(),
      password: this.password,
    };
    const authentication = this.isRegistering()
      ? this.authService.register({
          ...request,
          nombre: this.nombre.trim(),
          apellido: this.apellido.trim(),
        } satisfies RegisterRequest)
      : this.authService.login(request);

    authentication.subscribe({
      next: () => this.loading.set(false),
      error: (error: unknown) => {
        this.errorMessage.set(getApiErrorMessage(error, 'No se pudo iniciar sesión.'));
        this.loading.set(false);
      },
    });
  }
}
