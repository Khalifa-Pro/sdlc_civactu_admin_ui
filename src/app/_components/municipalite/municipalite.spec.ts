import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Municipalite } from './municipalite';

describe('Municipalite', () => {
  let component: Municipalite;
  let fixture: ComponentFixture<Municipalite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Municipalite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Municipalite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
