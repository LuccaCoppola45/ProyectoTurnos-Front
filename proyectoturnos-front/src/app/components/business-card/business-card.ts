import { Component, input, output } from '@angular/core';
import type { BusinessCardModel } from '../../models/business.model';

@Component({
  selector: 'app-business-card',
  standalone: true,
  styleUrl: './business-card.css',
  templateUrl: './business-card.html',
})
export class BusinessCard {
  readonly business = input.required<BusinessCardModel>();
  readonly isFavorite = input(false);
  readonly isSelected = input(false);
  readonly favoriteToggle = output<number>();
  readonly businessSelect = output<number>();

  protected toggleFavorite(): void {
    this.favoriteToggle.emit(this.business().id);
  }

  protected selectBusiness(): void {
    this.businessSelect.emit(this.business().id);
  }
}
