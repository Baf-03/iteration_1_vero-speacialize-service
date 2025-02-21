import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-booking',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './customer-booking.component.html',
  styleUrl: './customer-booking.component.scss',
})
export class CustomerBookingComponent implements OnInit {
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
