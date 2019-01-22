import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSectionComponent } from './events-section.component';

describe('EventsSectionComponent', () => {
  let component: EventsSectionComponent;
  let fixture: ComponentFixture<EventsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
