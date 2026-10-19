import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { BusinessCardModel, BusinessResponse } from '../models/business.model';

const CARD_COLORS: BusinessCardModel['color'][] = ['peach', 'sage', 'blue', 'lavender'];

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private readonly http = inject(HttpClient);

  getBusinesses(): Observable<BusinessCardModel[]> {
    return this.http.get<BusinessResponse[] | null>(`${environment.apiUrl}/api/comercios`).pipe(
      map((businesses) => (businesses ?? []).map((business, index) => this.toCardModel(business, index))),
    );
  }

  private toCardModel(business: BusinessResponse, index: number): BusinessCardModel {
    const categories = business.categorias ?? [];
    const services = business.servicios ?? [];
    const lowestPrice = services.reduce<number | null>(
      (currentLowest, service) =>
        currentLowest === null ? service.precio : Math.min(currentLowest, service.precio),
      null,
    );

    return {
      id: business.idComercio,
      name: business.nombre,
      categories,
      description: business.descripcion,
      location: business.direccion,
      priceLabel:
        lowestPrice === null
          ? 'Consultar precio'
          : `Desde ${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(lowestPrice)}`,
      color: CARD_COLORS[index % CARD_COLORS.length],
      initials: business.nombre
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join('')
        .toLocaleUpperCase(),
      services,
    };
  }
}
