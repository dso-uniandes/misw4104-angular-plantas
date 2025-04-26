/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PlantListComponent } from './plant-list.component';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let debug: DebugElement;
  const initialPlantCount = 3;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule ],
      declarations: [PlantListComponent],
      providers: [PlantService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < initialPlantCount; i++) {
      const plant = new Plant(
        i + 1,
        `Nombre Comun ${i}`,
        `Nombre Cientifico ${i}`,
        i % 2 === 0 ? 'Interior' : 'Exterior',
        1000 + i,
        `Clima ${i}`,
        `Sustrato Siembra ${i}`
      );
      component.plants.push(plant);
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Vivero El Otoño');
  });

  it('should have an image', () => {
    expect(debug.query(By.css('img'))).toBeTruthy();
  });

  it('should have a table with correct headers', () => {
    const headers = debug.queryAll(By.css('th'));
    expect(headers.length).toBe(4);
    expect(headers[0].nativeElement.textContent).toContain('#');
    expect(headers[1].nativeElement.textContent).toContain('Nombre común');
    expect(headers[2].nativeElement.textContent).toContain('Tipo');
    expect(headers[3].nativeElement.textContent).toContain('Clima');
  });

  it('should display one table row per plant', () => {
    const rows = debug.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(initialPlantCount);
  });

  it('should display correct plant data in each row', () => {
    const rows = debug.queryAll(By.css('tbody tr'));
    
    rows.forEach((row, index) => {
      const cells = row.queryAll(By.css('td'));
      const plant = component.plants[index];
      
      expect(cells[0].nativeElement.textContent).toContain(index + 1);
      expect(cells[1].nativeElement.textContent).toContain(plant.nombre_comun);
      expect(cells[2].nativeElement.textContent).toContain(plant.tipo);
      expect(cells[3].nativeElement.textContent).toContain(plant.clima);
    });
  });

  it('should correctly calculate interior plants count', () => {
    const expectedInteriorCount = component.plants.filter(p => p.tipo === 'Interior').length;
    const displayedCount = debug.query(By.css('div.container-fluid.text-left')).nativeElement.textContent;
    expect(displayedCount).toContain(`Total plantas de interior: ${expectedInteriorCount}`);
  });

  it('should correctly calculate exterior plants count', () => {
    const expectedExteriorCount = component.plants.filter(p => p.tipo === 'Exterior').length;
    const displayedCount = debug.query(By.css('div.container-fluid.text-left')).nativeElement.textContent;
    expect(displayedCount).toContain(`Total plantas de exterior: ${expectedExteriorCount}`);
  });

  it('should display contact information', () => {
    const contactInfo = debug.query(By.css('.container-fluid.text-center')).nativeElement.textContent;
    expect(contactInfo).toContain('Contact us: +57 3102105253 - info@viveroelotonio.com - @viveroelotonio');
  });

  it('should update counts when plants array changes', () => {
    component.plants.push(
      new Plant(
        4,
        'Nueva planta',
        'Nuevo nombre científico',
        'Interior',
        150,
        'Nuevo clima',
        'Nuevo sustrato'
      )
    );
    
    fixture.detectChanges();
    
    const expectedInteriorCount = component.plants.filter(p => p.tipo === 'Interior').length;
    const displayedCount = debug.query(By.css('div.container-fluid.text-left')).nativeElement.textContent;
    
    expect(displayedCount).toContain(`Total plantas de interior: ${expectedInteriorCount}`);
  });
});