import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplyComponent } from './list-supply.component';

describe('ListSupplyComponent', () => {
  let component: ListSupplyComponent;
  let fixture: ComponentFixture<ListSupplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSupplyComponent]
    });
    fixture = TestBed.createComponent(ListSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
