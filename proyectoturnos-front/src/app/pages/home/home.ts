import { Component, inject } from '@angular/core';
import { AuthPanel } from '../../components/auth-panel/auth-panel';
import { BusinessExplorer } from '../../components/business-explorer/business-explorer';
import { ClosingBanner } from '../../components/closing-banner/closing-banner';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [Header, Hero, AuthPanel, BusinessExplorer, HowItWorks, ClosingBanner, Footer],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class HomePage {
  protected readonly authService = inject(AuthService);
}
