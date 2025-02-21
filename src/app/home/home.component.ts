import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LocalStorageService } from '../shared/local-storage.service';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  categories: any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  async getCategories() {
    try {
      const res: any = await this.apiService.getProviderCategoriesAll();
      if (res && res.meta && res.meta.status === 200) {
        this.categories = res.data.data;
      }
    } catch (ex: any) {
      this.toastr.error('Error sending OTP.', 'Error');
    }
  }
}
