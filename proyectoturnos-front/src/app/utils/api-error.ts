import { HttpErrorResponse } from '@angular/common/http';

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'No se pudo conectar con el backend. Verificá que esté iniciado en http://localhost:8080.';
    }

    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    if (typeof error.error?.message === 'string') {
      return error.error.message;
    }

    if (typeof error.error?.mensaje === 'string') {
      return error.error.mensaje;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
