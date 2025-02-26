import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface StarBreakdown {
  star: number;
  percent: number;
}

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

interface GigResponse {
  result: {
    services: string[];       // Services (popular tasks)
    current_rating: number;   // Overall rating (0 if no rating)
    _id: string;
    title: string;
    price: number;
    short_description: string;
    description: string;
    user_id: {
      _id: string;
      email: string;
    };
    reviews: any[];           // Reviews array (empty if none)
    job: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  isSuccess: boolean;
}

@Component({
  selector: 'app-part-time-cleaners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './part-time-cleaners.component.html',
  styleUrls: ['./part-time-cleaners.component.scss'],
})
export class GigsDetailsProvider implements OnInit {
  // Hero / Main Service Info
  serviceTitle = 'Part-time Cleaners';
  serviceRating = 4.6;
  serviceReviewsCount: number = 568; // dummy count; will be updated from API reviews length
  servicePrice = 62.0; // per hour
  heroImageUrl =
    'https://media.licdn.com/dms/image/v2/C561BAQHS961kXf5sjA/company-background_10000/company-background_10000/0/1635378826217/cover_genius_cover?e=2147483647&v=beta&t=eyjurIzUddEmGepg99eyr4WCzQZPN0G6Ulwb7zXyQq4';

  // Seller Info
  sellerName = 'Jessica Strike';
  sellerServiceType = 'Premium cleaning service';
  sellerRating = 4.6;
  sellerAvatarUrl =
    'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid';
  sellerReviewsCount: number = 568;

  // Toggle for cleaning supplies
  hasCleaningSupplies = true;

  // Instead of tasks, we now use services from API
  services: string[] = [];

  // Disclaimers (unchanged)
  notes: { text: string }[] = [
    { text: 'Visiting / quotation charge if service is not availed $9 USD' },
    { text: 'Please manage your belongings for the security / building management prior to booking' },
    { text: 'Service might differ based on the service by the Vero Services Professional' },
  ];

  // Reviews and Ratings (dummy defaults)
  overallRating = 4.5;
  overallReviewCount = 72;

  starBreakdown: StarBreakdown[] = [
    { star: 5, percent: 50 },
    { star: 4, percent: 30 },
    { star: 3, percent: 10 },
    { star: 2, percent: 5 },
    { star: 1, percent: 5 },
  ];

  reviews: Review[] = [
    // Dummy reviews – if API returns empty array, UI will show "No feedback available"
    {
      name: 'Abraham Pape',
      rating: 4.2,
      date: 'Aug 23, 2023',
      comment:
        'Really amazing service. The cleaner arrived on time and was very thorough. Highly recommended!',
      avatar:
        'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
    },
    {
      name: 'Sally Brown',
      rating: 5.0,
      date: 'Sep 2, 2023',
      comment:
        'Fantastic! Everything was spotless, and the cleaner was so polite. Will definitely use again.',
      avatar:
        'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
    },
    {
      name: 'James Smith',
      rating: 4.0,
      date: 'Sep 10, 2023',
      comment:
        'They did a good job overall, though I wish they had spent a bit more time on the carpets. Still very satisfied!',
      avatar:
        'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
    },
    {
      name: 'Mary Amazing',
      rating: 4.8,
      date: 'Sep 14, 2023',
      comment:
        'Absolutely love this service. The cleaner was super friendly and left everything sparkling. Worth every penny!',
      avatar:
        'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
    },
  ];

  // Summary card data
  serviceName = '1-hour express cleaning';
  quantity = 1;
  basePrice = 62.0;
  discountPercent = 20;
  taxes = 5.0;
  serviceFee = 3.0;

  // Vero Promise
  veroPromiseItems: string[] = [
    'Verified Professionals',
    'Safe Chemicals',
    'Superior Stain Removal',
  ];

  // Descriptions (to be set from API)
  shortDescription = '';
  longDescription = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the gig id from the URL params
    const gigId = this.route.snapshot.paramMap.get('id');
    if (gigId) {
      this.fetchGigData(gigId);
    }
  }

  fetchGigData(id: string): void {
    const url = `gigs/${id}`;
    this.http.get<GigResponse>(url).subscribe({
      next: (response) => {
        if (response.isSuccess && response.result) {
          const result = response.result;
          // Update hero info
          if (result.title) {
            this.serviceTitle = result.title;
          }
          if (result.price) {
            this.servicePrice = result.price;
            this.basePrice = result.price;
          }
          if (result.user_id && result.user_id.email) {
            this.sellerName = result.user_id.email;
          }
          // Update rating if available; if current_rating is 0, we'll show N/A
          this.serviceRating = result.current_rating;
          this.sellerRating = result.current_rating;
          // Update reviews and counts
          if (result.reviews && result.reviews.length > 0) {
            this.reviews = result.reviews.map((rev: any) => ({
              name: rev.name,
              rating: rev.rating,
              date: rev.date,
              comment: rev.comment,
              avatar: rev.avatar,
            }));
            this.overallReviewCount = result.reviews.length;
            this.serviceReviewsCount = result.reviews.length;
            this.sellerReviewsCount = result.reviews.length;
          } else {
            this.reviews = [];
            this.overallReviewCount = 0;
            this.serviceReviewsCount = 0;
            this.sellerReviewsCount = 0;
          }
          // Update services (popular tasks)
          if (result.services && result.services.length > 0) {
            this.services = result.services;
          } else {
            this.services = [];
          }
          // Update descriptions
          if (result.short_description) {
            this.shortDescription = result.short_description;
          }
          if (result.description) {
            this.longDescription = result.description;
          }
        }
      },
      error: (err) => {
        console.error('Error fetching gig data', err);
      },
    });
  }

  // Computed properties
  get discountAmount(): number {
    return +(this.basePrice * (this.discountPercent / 100)).toFixed(2);
  }

  get subTotal(): number {
    return this.basePrice * this.quantity;
  }

  get total(): number {
    return +(this.subTotal - this.discountAmount + this.taxes + this.serviceFee).toFixed(2);
  }

  // Methods
  toggleCleaningSupplies() {
    this.hasCleaningSupplies = !this.hasCleaningSupplies;
  }

  incrementQty() {
    this.quantity++;
  }

  decrementQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  hireMe() {
    alert(`You have hired this service for ${this.quantity} hour(s)!`);
  }
}
