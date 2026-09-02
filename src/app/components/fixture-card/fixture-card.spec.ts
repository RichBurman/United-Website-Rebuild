import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureCard } from './fixture-card';

describe('FixtureCard', () => {
  let component: FixtureCard;
  let fixture: ComponentFixture<FixtureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
