import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyAddComponent } from './supply-add.component';

describe('SupplyAddComponent', () => {
  let component: SupplyAddComponent;
  let fixture: ComponentFixture<SupplyAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplyAddComponent]
    });
    fixture = TestBed.createComponent(SupplyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
