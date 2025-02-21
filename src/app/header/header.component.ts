import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: any = null;
  constructor(private localStorageService: LocalStorageService) {
    this.user = localStorageService.getUser();
  }

  ngOnInit(): void {}

  logout() {
    this.localStorageService.logoutUser();
  }
}
