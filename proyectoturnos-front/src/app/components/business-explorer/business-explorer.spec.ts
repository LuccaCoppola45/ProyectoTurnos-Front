import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BusinessExplorer } from './business-explorer';

describe('BusinessExplorer', () => {
  let httpMock: HttpTestingController;
  const businesses = [
    {
      idComercio: 1,
      nombre: 'Casa Oliva',
      direccion: 'Palermo, Buenos Aires',
      telefono: '111111',
      descripcion: 'Un espacio para renovar tu estilo.',
      categorias: ['Belleza'],
      servicios: [
        {
          idServicio: 10,
          nombreServicio: 'Corte de pelo',
          duracionDelServicio: 30,
          precio: 8500,
          idComercio: 1,
        },
      ],
      horarios: [],
      usuarioPropietarioId: 1,
    },
    {
      idComercio: 2,
      nombre: 'Alma Estudio',
      direccion: 'Villa Crespo, Buenos Aires',
      telefono: '222222',
      descripcion: 'Un espacio de bienestar.',
      categorias: ['Bienestar'],
      servicios: [
        {
          idServicio: 20,
          nombreServicio: 'Masajes',
          duracionDelServicio: 45,
          precio: 12000,
          idComercio: 2,
        },
      ],
      horarios: [],
      usuarioPropietarioId: 2,
    },
    {
      idComercio: 3,
      nombre: 'Norte Dental',
      direccion: 'Belgrano, Buenos Aires',
      telefono: '333333',
      descripcion: 'Cuidamos tu sonrisa.',
      categorias: ['Salud'],
      servicios: [],
      horarios: [],
      usuarioPropietarioId: 3,
    },
    {
      idComercio: 4,
      nombre: 'Punto Movimiento',
      direccion: 'Colegiales, Buenos Aires',
      telefono: '444444',
      descripcion: 'Encontrá tu ritmo.',
      categorias: ['Fitness'],
      servicios: [],
      horarios: [],
      usuarioPropietarioId: 4,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessExplorer],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  async function loadExplorer() {
    const fixture = TestBed.createComponent(BusinessExplorer);
    httpMock.expectOne('http://localhost:8080/api/comercios').flush(businesses);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it('should show the featured businesses', async () => {
    const fixture = await loadExplorer();

    expect(fixture.nativeElement.querySelectorAll('.business-card').length).toBe(4);
  });

  it('should filter businesses by category', async () => {
    const fixture = await loadExplorer();
    const beautyCategory = fixture.nativeElement.querySelectorAll('.category-chip')[1] as HTMLButtonElement;
    beautyCategory.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.business-card').length).toBe(1);
    expect(fixture.nativeElement.querySelector('.business-card h3')?.textContent).toContain('Casa Oliva');
  });

  it('should search businesses by their services', async () => {
    const fixture = await loadExplorer();
    const searchInput = fixture.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;
    searchInput.value = 'masajes';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.business-card').length).toBe(1);
    expect(fixture.nativeElement.querySelector('.business-card h3')?.textContent).toContain('Alma Estudio');
  });
});
