import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentSelectionComponent } from './opponent-selection.component';

describe('OpponentSelectionComponent', () => {
  let component: OpponentSelectionComponent;
  let fixture: ComponentFixture<OpponentSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
