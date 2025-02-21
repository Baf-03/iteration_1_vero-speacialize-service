import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProviderMenuComponent } from '../provider-menu/provider-menu.component';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';

interface Service {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-gigssss',
  standalone: true,
  imports: [CommonModule,RouterModule,
      SharedModule,
      ProviderMenuComponent,
      ProviderHeaderComponent,],
  
  templateUrl: './gigs-form.component.html',
  styleUrls: ['./gigs-form.component.scss'],
})
export class GigsFormComponent {
  gigTitle = 'Cleaning Service Provider';
  gigPrice = 60; // per hour
  description1 = '';
  description2 = '';
  additionalNotes = '';
  
  services: Service[] = [
    { name: 'Cleaning', selected: true },
    { name: 'Plumbing', selected: true },
    { name: 'Electrical', selected: true },
    { name: 'Roofing', selected: true },
  ];

  // For the <select> box
  selectedService = 'Please Select';

  // Called when user clicks 'Cancel'
  onCancel(): void {
    alert('Form canceled!');
  }

  // Called when user clicks 'Update Gigs'
  onUpdateGigs(): void {
    alert('Gigs updated successfully!');
  }

  // Optional: remove a service from the list
  removeService(service: Service) {
    service.selected = false;
  }
}
