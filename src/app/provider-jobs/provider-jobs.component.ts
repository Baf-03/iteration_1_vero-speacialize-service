import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { ProviderMenuComponent } from '../provider-menu/provider-menu.component';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';

@Component({
  selector: 'app-provider-jobs',
  standalone: true,
  imports: [
    RouterModule,
    SharedModule,
    ProviderMenuComponent,
    ProviderHeaderComponent,
  ],
  templateUrl: './provider-jobs.component.html',
  styleUrl: './provider-jobs.component.scss',
})
export class ProviderJobsComponent {
  jobs: any = [];
  status: any = null;
  type: any = null;

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  async ngOnInit(): Promise<void> {
    await this.getJobs();
  }

  async getJobs() {
    try {
      const res: any = await this.apiService.getJobs(this.status, this.type);
      if (res && res.isSuccess) {
        this.jobs = res.result;
      }
    } catch (ex: any) {
      this.toastr.error('Error fetching jobs.', 'Error');
    }
  }
}
