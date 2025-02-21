import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-provider-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './provider-menu.component.html',
  styleUrl: './provider-menu.component.scss',
})
export class ProviderMenuComponent {
  constructor(private userService: LocalStorageService) {}

  logout() {
    this.userService.logoutUser();
  }
}
