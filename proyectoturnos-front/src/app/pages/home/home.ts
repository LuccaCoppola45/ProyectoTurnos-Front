import { Component } from '@angular/core';
import { BusinessExplorer } from '../../components/business-explorer/business-explorer';
import { ClosingBanner } from '../../components/closing-banner/closing-banner';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { HowItWorks } from '../../components/how-it-works/how-it-works';

@Component({
  selector: 'app-home-page',
  imports: [Header, Hero, BusinessExplorer, HowItWorks, ClosingBanner, Footer],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class HomePage {}
