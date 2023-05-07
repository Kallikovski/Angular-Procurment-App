import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProductOverviewComponent } from './profile-product-overview.component';

describe('ProfileProductOverviewComponent', () => {
  let component: ProfileProductOverviewComponent;
  let fixture: ComponentFixture<ProfileProductOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileProductOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProductOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
