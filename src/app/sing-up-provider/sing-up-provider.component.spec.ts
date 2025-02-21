import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpProviderComponent } from './sing-up-provider.component';

describe('SingUpProviderComponent', () => {
  let component: SingUpProviderComponent;
  let fixture: ComponentFixture<SingUpProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingUpProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingUpProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
