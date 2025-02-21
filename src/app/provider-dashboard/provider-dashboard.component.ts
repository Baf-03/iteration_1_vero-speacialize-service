import { Component } from '@angular/core';
import { ProviderMenuComponent } from '../provider-menu/provider-menu.component';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [ProviderMenuComponent, ProviderHeaderComponent],
  templateUrl: './provider-dashboard.component.html',
  styleUrl: './provider-dashboard.component.scss',
})
export class ProviderDashboardComponent {}
