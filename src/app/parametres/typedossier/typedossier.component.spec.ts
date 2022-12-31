import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedossierComponent } from './typedossier.component';

describe('TypedossierComponent', () => {
  let component: TypedossierComponent;
  let fixture: ComponentFixture<TypedossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypedossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
