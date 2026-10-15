import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPage } from './auction-page';

describe('AuctionPage', () => {
  let component: AuctionPage;
  let fixture: ComponentFixture<AuctionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
