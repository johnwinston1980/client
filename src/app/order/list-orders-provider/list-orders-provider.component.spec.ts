import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdersProviderComponent } from './list-orders-provider.component';

describe('ListOrdersProviderComponent', () => {
  let component: ListOrdersProviderComponent;
  let fixture: ComponentFixture<ListOrdersProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrdersProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdersProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
