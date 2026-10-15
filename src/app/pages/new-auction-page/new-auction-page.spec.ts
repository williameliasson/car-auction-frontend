import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAuctionPage } from './new-auction-page';

describe('NewAuctionPage', () => {
  let component: NewAuctionPage;
  let fixture: ComponentFixture<NewAuctionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAuctionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAuctionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
