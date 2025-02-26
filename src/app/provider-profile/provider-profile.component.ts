import { Component, OnInit } from '@angular/core';
import { ProviderMenuComponent } from '../provider-menu/provider-menu.component';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { LocalStorageService } from '../shared/local-storage.service';

export interface Gig {
  title: string;
  description: string;
  rating: number;
  reviews: string;
  price: number;
  imageUrl: string;
  isLiked: boolean;
}

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [ProviderMenuComponent, ProviderHeaderComponent, SharedModule],
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss']
})
export class ProviderProfileComponent implements OnInit {
  isFormLoaded = false;
  isSavingInProgress = false;
  firstFormGroup: any;
  serviceTypes: any = [];
  user: any = null;

  // We'll load gigs from the API into this array
  gigs: Gig[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: ApiService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
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
      about: [
        this.user?.about || '',
        Validators.compose([Validators.required])
      ],
      visiting_charges: [
        this.user?.visiting_charges || '',
        Validators.compose([Validators.required])
      ],
      email: [
        this.user?.email || '',
        Validators.compose([Validators.required, Validators.email])
      ],
      skills: [
        this.user?.skills || [],
        Validators.compose([Validators.required])
      ]
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

  // Fetch the gigs for the current provider from the API.
  async loadMyGigs() {
    try {
      // Assume your API expects the bearer token in the header
      // and your LocalStorageService can provide the token.
      const res: any = await this.authService.getMyGigs();
      if (res && res.isSuccess && res.result) {
        // Map the API gig to our Gig interface.
        // Adjust the mapping as needed.
        this.gigs = res.result.map((gig: any) => {
          return {
            title: gig.title,
            description: gig.short_description,
            rating: gig.current_rating,
            reviews: Array.isArray(gig.reviews) ? gig.reviews.length.toString() : '0',
            price: gig.price,
            // If your API doesn’t return an image URL, you can use a default placeholder.
            imageUrl: gig.imageUrl || 'https://via.placeholder.com/150',
            isLiked: false
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

  // "Message" button click action
  onMessage(): void {
    alert('Message clicked!');
  }

  // Toggle the like state for a gig
  toggleLike(gig: Gig) {
    gig.isLiked = !gig.isLiked;
  }
}
