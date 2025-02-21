import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderHeaderComponent } from './provider-header.component';

describe('ProviderHeaderComponent', () => {
  let component: ProviderHeaderComponent;
  let fixture: ComponentFixture<ProviderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
