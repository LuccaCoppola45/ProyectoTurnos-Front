export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  nombre: string;
  apellido: string;
}

export interface LoginResponse {
  success: boolean;
  mensaje: string;
  token: string;
}
