import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProviderComponent } from './login-provider.component';

describe('LoginProviderComponent', () => {
  let component: LoginProviderComponent;
  let fixture: ComponentFixture<LoginProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
