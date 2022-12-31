import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSignalisationComponent } from './list-signalisation.component';

describe('ListSignalisationComponent', () => {
  let component: ListSignalisationComponent;
  let fixture: ComponentFixture<ListSignalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSignalisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSignalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
