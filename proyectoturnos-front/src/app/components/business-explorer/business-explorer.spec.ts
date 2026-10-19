import { TestBed } from '@angular/core/testing';
import { BusinessExplorer } from './business-explorer';

describe('BusinessExplorer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessExplorer],
    }).compileComponents();
  });

  it('should show the featured businesses', async () => {
    const fixture = TestBed.createComponent(BusinessExplorer);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.business-card').length).toBe(4);
  });

  it('should filter businesses by category', async () => {
    const fixture = TestBed.createComponent(BusinessExplorer);
    fixture.detectChanges();
    const beautyCategory = fixture.nativeElement.querySelectorAll('.category-chip')[1] as HTMLButtonElement;
    beautyCategory.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.business-card').length).toBe(1);
    expect(fixture.nativeElement.querySelector('.business-card h3')?.textContent).toContain('Casa Oliva');
  });

  it('should search businesses by their services', async () => {
    const fixture = TestBed.createComponent(BusinessExplorer);
    fixture.detectChanges();
    const searchInput = fixture.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;
    searchInput.value = 'masajes';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.business-card').length).toBe(1);
    expect(fixture.nativeElement.querySelector('.business-card h3')?.textContent).toContain('Alma Estudio');
  });
});
