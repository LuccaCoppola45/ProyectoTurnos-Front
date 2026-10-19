import { Component } from '@angular/core';
import { BookingPreview } from '../booking-preview/booking-preview';

@Component({
  selector: 'app-hero',
  imports: [BookingPreview],
  standalone: true,
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {}
