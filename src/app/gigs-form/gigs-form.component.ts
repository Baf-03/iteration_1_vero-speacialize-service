import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ProviderMenuComponent } from '../provider-menu/provider-menu.component';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';
import { ToastrService } from 'ngx-toastr';

interface ServiceCategory {
  _id: string;
  name: string;
  icon_url?: string;
}

@Component({
  selector: 'app-gigs-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProviderMenuComponent,
    ProviderHeaderComponent
  ],
  template: `
  <div class="dashboard">
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar Area -->
        <div class="col-md-3 dash-left-area">
          <app-provider-menu></app-provider-menu>
        </div>

        <!-- Main Content Area -->
        <div class="col-md-9 dash-right-area">
          <div class="gigs-form-wrapper">
            <!-- Page Title -->
            <h1 class="page-title">Gigs</h1>

            <!-- Header (optional) -->
            <app-provider-header></app-provider-header>

            <!-- FORM CONTAINER -->
            <div class="form-container">
              <!-- Row 1: Gig Title & Gig Price -->
              <div class="form-row">
                <!-- Gig Title -->
                <div class="form-group half-width">
                  <label for="gigTitle">Gig Title</label>
                  <input
                    type="text"
                    id="gigTitle"
                    [(ngModel)]="gigTitle"
                    placeholder="Cleaning Service Provider"
                  />
                </div>

                <!-- Gig Price -->
                <div class="form-group half-width">
                  <label for="gigPrice">Gig Price</label>
                  <div class="price-input">
                    <input
                      type="number"
                      id="gigPrice"
                      [(ngModel)]="gigPrice"
                      placeholder="60.00"
                      step="0.01"
                      min="0"
                    />
                    <span class="price-unit">/hr</span>
                  </div>
                </div>
              </div>

              <!-- Row 2: Short Description -->
              <div class="form-group">
                <label for="description1">Short Description</label>
                <textarea
                  id="description1"
                  rows="3"
                  [(ngModel)]="description1"
                  placeholder="Enter short description..."
                ></textarea>
              </div>

              <!-- Row 3: Long Description -->
              <div class="form-group">
                <label for="description2">Long Description</label>
                <textarea
                  id="description2"
                  rows="3"
                  [(ngModel)]="description2"
                  placeholder="Enter long description..."
                ></textarea>
              </div>

              <!-- Row 4: Additional Notes -->
              <div class="form-group">
                <label for="additionalNotes">Additional Notes</label>
                <textarea
                  id="additionalNotes"
                  rows="2"
                  [(ngModel)]="additionalNotes"
                  placeholder="Any additional notes..."
                ></textarea>
              </div>

              <!-- Row 5: Select Services -->
              <div class="form-group">
                <label for="servicesSelect">Select Services</label>
                <select
                  id="servicesSelect"
                  [(ngModel)]="selectedService"
                  (change)="onServiceSelect($event)"
                >
                  <option>Please Select</option>
                  <option *ngFor="let s of allServices" [value]="s._id">
                    {{ s.name }}
                  </option>
                </select>
              </div>

              <!-- Selected Services (chips) -->
              <div class="selected-services">
                <span class="service-chip" *ngFor="let s of selectedServices">
                  {{ getServiceNameById(s) }}
                  <button type="button" class="remove-chip" (click)="removeService(s)">
                    &times;
                  </button>
                </span>
              </div>

              <!-- ACTION BUTTONS -->
              <div class="form-actions">
                <button class="btn-cancel" type="button" (click)="onCancel()">
                  Cancel
                </button>
                <button class="btn-update" type="button" (click)="onSubmitGigs()">
                  {{ gigId ? 'Update Gigs' : 'Add Gigs' }}
                </button>
              </div>

              <!-- "Add More Gigs" button appears only in edit mode -->
              <div class="add-more-gigs" *ngIf="gigId">
                <button type="button" (click)="onAddMoreGigs()">
                  Add More Gigs
                </button>
              </div>
            </div>
            <!-- End of FORM CONTAINER -->
          </div>
        </div>
        <!-- End Main Content Area -->
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./gigs-form.component.scss']
})
export class GigsFormComponent implements OnInit {
  // Form fields
  gigTitle = '';
  gigPrice = 0;
  description1 = ''; // short_description
  description2 = ''; // description
  additionalNotes = '';

  // For services
  allServices: ServiceCategory[] = []; // fetched from provider-category API
  selectedServices: string[] = [];      // IDs of selected services
  selectedService = 'Please Select';    // for the <select> dropdown

  // If editing, gigId will be set
  gigId: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    // 1) Fetch all services
    this.fetchAllServices();

    // 2) Check if there's an ?id=... in the URL for editing
    this.route.queryParams.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        this.gigId = idParam;
        this.fetchGigDetails(this.gigId);
      }
    });
  }

  // Utility: get your token from localStorage or any other place
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // ==============================
  //  Fetch All Services
  // ==============================
  fetchAllServices(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    });

    this.http.get<any>('provider-category', { headers }).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.allServices = res.result;
        } else {
          alert('Failed to fetch services');
        }
      },
      error: (err) => {
        console.error('Error fetching services', err);
        alert('Error fetching services');
      }
    });
  }

  // ==============================
  //  Fetch Gig Details (Edit Mode)
  // ==============================
  fetchGigDetails(id: string | null): void {
    if (!id) return;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    });

    this.http.get<any>(`gigs/${id}`, { headers }).subscribe({
      next: (res) => {
        if (res.isSuccess && res.result) {
          const gig = res.result;
          // Fill the form fields from the fetched gig
          this.gigTitle = gig.title;
          this.gigPrice = gig.price;
          this.description1 = gig.short_description;
          this.description2 = gig.description;
          this.additionalNotes = '';
          this.selectedServices = gig.services || [];
        } else {
          alert('Failed to fetch gig details');
          this.clearEditMode();
        }
      },
      error: (err) => {
        console.error('Error fetching gig details', err);
        alert('Error fetching gig details');
        this.clearEditMode();
      }
    });
  }

  // ==============================
  //  Handle Service Selection
  // ==============================
  onServiceSelect(event: any): void {
    const serviceId = event.target.value;
    if (serviceId !== 'Please Select' && !this.selectedServices.includes(serviceId)) {
      this.selectedServices.push(serviceId);
    }
    this.selectedService = 'Please Select';
  }

  // Helper to display service name from ID
  getServiceNameById(id: string): string {
    const found = this.allServices.find(s => s._id === id);
    return found ? found.name : 'Unknown';
  }

  // Remove service chip
  removeService(serviceId: string): void {
    this.selectedServices = this.selectedServices.filter(s => s !== serviceId);
  }

  // ==============================
  //  Submit (Create / Update)
  // ==============================
  onSubmitGigs(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    });

    // Build request body
    const body: any = {
      title: this.gigTitle,
      price: this.gigPrice,
      short_description: this.description1,
      description: this.description2,
      services: this.selectedServices
    };

    // If updating, include the gig id and make PUT request
    if (this.gigId) {
      body.id = this.gigId;
      this.http.put<any>('gigs', body, { headers }).subscribe({
        next: (res) => {
          if (res.isSuccess && res.result) {
            this.toastr.info("Gig updated successfully!");
            this.router.navigate(['/gigs-listing/provider']);

            // Optionally, redirect or perform another action after update
          } else {
            alert('Failed to update gig');
          }
        },
        error: (err) => {
          console.error('Error updating gig', err);
          alert('Error updating gig');
        }
      });
    } else {
      // If creating, POST request
      this.http.post<any>('gigs', body, { headers }).subscribe({
        next: (res) => {
          if (res.isSuccess && res.result) {
            this.toastr.info("Gig created successfully!");
            // Redirect to the gigs listing page for providers
            this.router.navigate(['/gigs-listing/provider']);
          } else {
            alert('Failed to create gig');
          }
        },
        error: (err) => {
          console.error('Error saving gig', err);
          alert('Error saving gig');
        }
      });
    }
  }

  // ==============================
  //  Exit Edit Mode & Clear Form
  // ==============================
  onAddMoreGigs(): void {
    // Clear the gig id, so the form goes into create mode
    this.gigId = null;
    // Clear the URL query parameter
    this.router.navigate([], { queryParams: { id: null }, replaceUrl: true });
    // Reset form fields and selected services
    this.gigTitle = '';
    this.gigPrice = 0;
    this.description1 = '';
    this.description2 = '';
    this.additionalNotes = '';
    this.selectedServices = [];
    this.selectedService = 'Please Select';
  }

  // ==============================
  //  Cancel Button
  // ==============================
  onCancel(): void {
    alert('Form canceled!');
    // You can navigate away or reset fields here if desired
  }

  // Utility to clear edit mode (used when fetching gig details fails)
  private clearEditMode(): void {
    this.gigId = null;
    this.router.navigate([], { queryParams: { id: null }, replaceUrl: true });
  }
}
