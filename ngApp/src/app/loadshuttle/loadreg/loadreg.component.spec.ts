import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadregComponent } from './loadreg.component';

describe('LoadregComponent', () => {
  let component: LoadregComponent;
  let fixture: ComponentFixture<LoadregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
