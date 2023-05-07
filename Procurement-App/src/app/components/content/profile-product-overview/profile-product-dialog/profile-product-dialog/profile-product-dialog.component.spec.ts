import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProductDialogComponent } from './profile-product-dialog.component';

describe('ProfileProductDialogComponent', () => {
  let component: ProfileProductDialogComponent;
  let fixture: ComponentFixture<ProfileProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
