import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { BusinessCard } from '../business-card/business-card';
import { AppointmentForm } from '../appointment-form/appointment-form';
import { BusinessService } from '../../services/business.service';
import type { BusinessCardModel } from '../../models/business.model';
import { getApiErrorMessage } from '../../utils/api-error';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-business-explorer',
  standalone: true,
  imports: [BusinessCard, AppointmentForm],
  styleUrl: './business-explorer.css',
  templateUrl: './business-explorer.html',
})
export class BusinessExplorer {
  private readonly businessService = inject(BusinessService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly searchTerm = signal('');
  protected readonly activeCategory = signal('Todos');
  protected readonly selectedBusiness = signal<number | null>(null);
  protected readonly favoriteBusinesses = signal<number[]>([]);
  protected readonly businesses = signal<BusinessCardModel[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly categories = computed(() => [
    'Todos',
    ...new Set(this.businesses().flatMap((business) => business.categories)),
  ]);
  protected readonly selectedBusinessDetails = computed(
    () => this.businesses().find((business) => business.id === this.selectedBusiness()) ?? null,
  );

  protected readonly filteredBusinesses = computed(() => {
    const query = this.searchTerm().trim().toLocaleLowerCase();
    const category = this.activeCategory();

    return this.businesses().filter((business) => {
      const matchesCategory = category === 'Todos' || business.categories.includes(category);
      const searchableText = [
        business.name,
        ...business.categories,
        business.description,
        business.location,
        ...business.services.map((service) => service.nombreServicio),
      ]
        .join(' ')
        .toLocaleLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  });

  constructor() {
    this.loadBusinesses();
  }

  protected loadBusinesses(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.businessService
      .getBusinesses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (businesses) => {
          this.businesses.set(businesses);
          this.loading.set(false);
        },
        error: (error: unknown) => {
          this.errorMessage.set(getApiErrorMessage(error, 'No se pudieron cargar los comercios.'));
          this.loading.set(false);
        },
      });
  }

  protected updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  protected selectBusiness(id: number): void {
    this.selectedBusiness.update((selectedId) => (selectedId === id ? null : id));
  }

  protected toggleFavorite(id: number): void {
    this.favoriteBusinesses.update((favorites) =>
      favorites.includes(id) ? favorites.filter((favoriteId) => favoriteId !== id) : [...favorites, id],
    );
  }

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.activeCategory.set('Todos');
  }

  protected closeBooking(): void {
    this.selectedBusiness.set(null);
  }
}
