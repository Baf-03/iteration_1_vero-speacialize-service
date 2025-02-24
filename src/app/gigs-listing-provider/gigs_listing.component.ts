import { Component, OnInit } from '@angular/core';
import { ProviderMenuComponent } from '../provider-menu/provider-menu.component';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { LocalStorageService } from '../shared/local-storage.service';
import { Router } from '@angular/router';

export interface Gig {
  id: string; // Unique identifier
  name: string;
  description: string;
  rating: number;
  reviews: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [ProviderMenuComponent, ProviderHeaderComponent, SharedModule],
  templateUrl: './gigs_listing.component.html',
  styleUrls: ['./app-vero-handyman.component.scss']
})
export class GigsListingProvider implements OnInit {
  isFormLoaded = false;
  isSavingInProgress = false;
  firstFormGroup: any;
  serviceTypes: any = [];
  user: any = null;

  // We'll load gigs from the API into this array
  gigs: Gig[] = [];

  // Dummy values to use for each gig regardless of API response
  private dummyImageUrl = 'https://img.freepik.com/free-psd/portrait-man-teenager-isolated_23-2151745771.jpg';
  private dummyRating = 4.5;
  private dummyReviews = '123';

  constructor(
    private fb: FormBuilder,
    private authService: ApiService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    // Get the logged in user from localStorage
    this.user = this.localStorageService.getUser();
  }

  async ngOnInit() {
    this.createForm();
    await this.loadServiceProvider();
    await this.loadMyGigs();
  }

  createForm() {
    this.firstFormGroup = this.fb.group({
      about: [ this.user?.about || '', Validators.required ],
      visiting_charges: [ this.user?.visiting_charges || '', Validators.required ],
      email: [ this.user?.email || '', [Validators.required, Validators.email] ],
      skills: [ this.user?.skills || [], Validators.required ]
    });
    this.isFormLoaded = true;
  }

  async loadServiceProvider() {
    try {
      const res: any = await this.authService.getProviderCategoriesAll();
      if (res && res.meta.status === 200) {
        this.serviceTypes = res.data.data;
      }
    } catch (ex: any) {
      if (ex.error?.meta?.message) {
        this.toastr.error(ex.error.meta.message, 'Error');
      }
    }
  }

  // Fetch gigs for the current provider and override image & rating with dummy values
  async loadMyGigs() {
    try {
      const res: any = await this.authService.getMyGigs();
      if (res && res.isSuccess && res.result) {
        // Map API response to Gig interface and override image and rating values
        this.gigs = res.result.map((gig: any) => {
          return {
            id: gig._id, // Ensure your API returns this field
            name: gig.title,
            description: gig.short_description,
            rating: this.dummyRating,
            reviews: this.dummyReviews,
            price: gig.price,
            imageUrl: this.dummyImageUrl
          } as Gig;
        });
      } else {
        this.toastr.error('Failed to load gigs', 'Error');
      }
    } catch (ex: any) {
      this.toastr.error('Error fetching gigs', 'Error');
    }
  }

  async update() {
    this.isSavingInProgress = true;
    if (this.firstFormGroup.valid) {
      try {
        const res: any = await this.authService.updateProviderProfile(
          this.firstFormGroup.value,
          this.user._id
        );
        if (res && res.isSuccess) {
          this.toastr.success('Profile updated successfully.', 'Success');
        }
      } catch (ex: any) {
        this.toastr.error('Error updating profile.', 'Error');
      }
    }
    this.isSavingInProgress = false;
  }

  // Navigate to gig details page using the gig id
  onInfo(gig: Gig): void {
    if (gig && gig.id) {
      this.router.navigate(['/gigs-info/provider', gig.id]);
    } else {
      console.error('Gig id is missing', gig);
    }
  }

  // Navigate to the gig form page with the gig id as a query parameter (for editing)
  onEdit(gig: Gig): void {
    if (gig && gig.id) {
      this.router.navigate(['/gigs-form'], { queryParams: { id: gig.id } });
    } else {
      console.error('Gig id is missing', gig);
    }
  }

  // Navigate to add a new gig (no query params) by redirecting to /gigs-form
  onAddNewGig(): void {
    this.router.navigate(['/gigs-form']);
  }
}
