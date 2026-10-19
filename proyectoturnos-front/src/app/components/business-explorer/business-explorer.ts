import { Component, computed, inject, signal } from '@angular/core';
import { BusinessCard } from '../business-card/business-card';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-business-explorer',
  standalone: true,
  imports: [BusinessCard],
  styleUrl: './business-explorer.css',
  templateUrl: './business-explorer.html',
})
export class BusinessExplorer {
  private readonly businessService = inject(BusinessService);

  protected readonly searchTerm = signal('');
  protected readonly activeCategory = signal('Todos');
  protected readonly selectedBusiness = signal<number | null>(null);
  protected readonly favoriteBusinesses = signal<number[]>([]);
  protected readonly categories = ['Todos', 'Belleza', 'Bienestar', 'Salud', 'Fitness'];
  protected readonly businesses = this.businessService.getFeaturedBusinesses();

  protected readonly filteredBusinesses = computed(() => {
    const query = this.searchTerm().trim().toLocaleLowerCase();
    const category = this.activeCategory();

    return this.businesses.filter((business) => {
      const matchesCategory = category === 'Todos' || business.category === category;
      const searchableText = [
        business.name,
        business.category,
        business.description,
        business.location,
        ...business.services,
      ]
        .join(' ')
        .toLocaleLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  });

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
}
