import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { ProviderMenuComponent } from '../provider-menu/provider-menu.component';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';

@Component({
  selector: 'app-gigs',
  standalone: true,
  imports: [
    RouterModule,
    SharedModule,
    ProviderMenuComponent,
    ProviderHeaderComponent,
  ],
  templateUrl: './gigs.component.html',
  styleUrls: ['./gigs.component.scss'],
})
export class GigsComponent {
  gigs: any = [];
  status: any = null;
  type: any = null;

  constructor(private toastr: ToastrService) {}

  async ngOnInit(): Promise<void> {
    await this.getGigs();
  }

  async getGigs() {
    try {
      // Dummy data for gigs
      const dummyGigs = [
        {
          title: 'Design a Logo',
          category: { icon_url: 'https://dummyimage.com/50x50/000/fff.png&text=Logo' },
          client: { full_name: 'John Doe', email: 'john@example.com' },
          location: 'New York, NY',
          status: 'Pending'
        },
        {
          title: 'Build a Website',
          category: { icon_url: 'https://dummyimage.com/50x50/000/fff.png&text=Web' },
          client: { full_name: 'Jane Smith', email: 'jane@example.com' },
          location: 'Los Angeles, CA',
          status: 'Upcoming'
        },
        {
          title: 'Create a Mobile App',
          category: { icon_url: 'https://dummyimage.com/50x50/000/fff.png&text=App' },
          client: { full_name: 'Bob Brown', email: 'bob@example.com' },
          location: 'Chicago, IL',
          status: 'InProgress'
        },
        {
          title: 'Social Media Campaign',
          category: { icon_url: 'https://dummyimage.com/50x50/000/fff.png&text=SM' },
          client: { full_name: 'Alice Green', email: 'alice@example.com' },
          location: 'San Francisco, CA',
          status: 'Completed'
        }
      ];

      // Simulate a delay like an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // If a status filter is set, filter the dummy data
      let filteredGigs = dummyGigs;
      if (this.status) {
        filteredGigs = dummyGigs.filter(gig => gig.status === this.status);
      }

      this.gigs = filteredGigs;
    } catch (ex: any) {
      this.toastr.error('Error fetching gigs.', 'Error');
    }
  }
}
