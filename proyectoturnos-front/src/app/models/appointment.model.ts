export interface AppointmentRequest {
  fecha: string;
  horaInicio: string;
  servicioId: number;
  idComercio: number;
}

export interface AppointmentResponse {
  idTurno: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  usuarioId: number;
  servicioId: number;
  cancelacionId: number | null;
  idComercio: number;
}
