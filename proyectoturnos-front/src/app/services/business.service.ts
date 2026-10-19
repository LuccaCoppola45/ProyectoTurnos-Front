import { Injectable } from '@angular/core';
import type { Business } from '../models/business.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private readonly featuredBusinesses: readonly Business[] = [
    {
      id: 1,
      name: 'Casa Oliva',
      category: 'Belleza',
      description: 'Un espacio para renovar tu estilo.',
      rating: '4.9',
      location: 'Palermo, Buenos Aires',
      price: 'Desde $8.500',
      color: 'peach',
      initials: 'CO',
      services: ['Corte de pelo', 'Coloración'],
    },
    {
      id: 2,
      name: 'Alma Estudio',
      category: 'Bienestar',
      description: 'Bajá un cambio, estás en buenas manos.',
      rating: '4.8',
      location: 'Villa Crespo, Buenos Aires',
      price: 'Desde $12.000',
      color: 'sage',
      initials: 'AE',
      services: ['Masajes', 'Yoga'],
    },
    {
      id: 3,
      name: 'Norte Dental',
      category: 'Salud',
      description: 'Cuidamos tu sonrisa con calidez.',
      rating: '5.0',
      location: 'Belgrano, Buenos Aires',
      price: 'Desde $15.000',
      color: 'blue',
      initials: 'ND',
      services: ['Limpieza dental', 'Consulta'],
    },
    {
      id: 4,
      name: 'Punto Movimiento',
      category: 'Fitness',
      description: 'Encontrá tu ritmo y disfrutá el proceso.',
      rating: '4.9',
      location: 'Colegiales, Buenos Aires',
      price: 'Desde $6.000',
      color: 'lavender',
      initials: 'PM',
      services: ['Entrenamiento', 'Pilates'],
    },
  ];

  getFeaturedBusinesses(): readonly Business[] {
    return this.featuredBusinesses;
  }
}
