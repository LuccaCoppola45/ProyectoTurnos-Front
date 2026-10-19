export interface BusinessService {
  idServicio: number;
  nombreServicio: string;
  duracionDelServicio: number;
  precio: number;
  idComercio: number;
}

export interface BusinessHours {
  idHorarioAtencion: number;
  comercioId: number;
  diaSemana: string;
  horaApertura: string;
  horaCierre: string;
}

export interface BusinessResponse {
  idComercio: number;
  nombre: string;
  direccion: string;
  telefono: string;
  descripcion: string;
  categorias: string[];
  servicios: BusinessService[];
  horarios: BusinessHours[];
  usuarioPropietarioId: number;
}

export interface BusinessCardModel {
  id: number;
  name: string;
  categories: string[];
  description: string;
  location: string;
  priceLabel: string;
  color: 'peach' | 'sage' | 'blue' | 'lavender';
  initials: string;
  services: BusinessService[];
}
