import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderJobsComponent } from './provider-jobs.component';

describe('ProviderJobsComponent', () => {
  let component: ProviderJobsComponent;
  let fixture: ComponentFixture<ProviderJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
