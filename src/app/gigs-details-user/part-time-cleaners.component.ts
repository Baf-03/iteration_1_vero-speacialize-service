import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface GigResponse {
  result: {
    services: { name: string }[];
    current_rating: number;
    _id: string;
    title: string;
    price: number;
    short_description: string;
    description: string;
    user_id: {
      _id: string;
      email: string;
      full_name: string
    };
    reviews: any[];
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
  styleUrls: ['./part-time-cleaners.component.scss']
})
export class PartTimeCleanersComponent implements OnInit {
  // API-based
  gigId: string | null = null;

  // Hero / Main Service Info
  userId = ''
  serviceTitle = 'Part-time Cleaners';
  serviceRating = 0; // We'll set from API's current_rating
  serviceReviewsCount = 0; // We'll set from reviews array length
  servicePrice = 62.0; // per hour
  heroImageUrl =
    'https://media.licdn.com/dms/image/v2/C561BAQHS961kXf5sjA/company-background_10000/company-background_10000/0/1635378826217/cover_genius_cover?e=2147483647&v=beta&t=eyjurIzUddEmGepg99eyr4WCzQZPN0G6Ulwb7zXyQq4'; // Dummy hero image

  // Seller Info
  sellerName = 'N/A';
  sellerServiceType = 'Premium cleaning service';
  sellerRating = 0; // from API's current_rating or set manually if needed
  sellerAvatarUrl =
    'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid'; // Dummy avatar
  sellerReviewsCount = 0; // from reviews array length

  // Toggle for cleaning supplies
  hasCleaningSupplies = true;

  // Services from API (replaces the old tasks array)
  maidServices: { name: string }[] = [];

  // Short & Long Descriptions from API
  shortDescription = '';
  longDescription = '';

  // If the gig has reviews, we store them. If empty, we show "No feedback"
  reviews: any[] = [];

  // Summary card data
  serviceName = '1-hour express cleaning';
  quantity = 1;
  basePrice = 62.0;
  discountPercent = 0; // currently unused
  taxes = 5.0;
  serviceFee = 3.0;

  // Vero Promise
  veroPromiseItems: string[] = [
    'Verified Professionals',
    'Safe Chemicals',
    'Superior Stain Removal',
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Get the gig id from the URL params
    this.gigId = this.route.snapshot.paramMap.get('id');
    if (this.gigId) {
      this.fetchGigData(this.gigId);
    }
  }

  fetchGigData(id: string): void {
    const url = `gigs/${id}`;
    this.http.get<GigResponse>(url).subscribe({
      next: (response) => {
        if (response.isSuccess && response.result) {
          const result = response.result;

          // Title & Price
          if (result.title) {
            this.serviceTitle = result.title;
          }
          if (result.price) {
            this.servicePrice = result.price;
            this.basePrice = result.price;
          }

          // Seller
          if (result.user_id && result.user_id.full_name) {
            this.sellerName = result.user_id.full_name;
          }

          // Current Rating
          if (result.current_rating > 0) {
            this.serviceRating = result.current_rating;
            this.sellerRating = result.current_rating;
          } else {
            // rating is 0 or not provided
            this.serviceRating = 0;
            this.sellerRating = 0;
          }

          // Services
          if (result.services && result.services.length > 0) {
            this.maidServices = result.services;
          }

          // Short & Long Descriptions
          if (result.short_description) {
            this.shortDescription = result.short_description;
          }
          if (result.description) {
            this.longDescription = result.description;
          }

          // Reviews
          if (result.reviews && result.reviews.length > 0) {
            this.reviews = result.reviews;
            this.serviceReviewsCount = result.reviews.length;
            this.sellerReviewsCount = result.reviews.length;
          } else {
            // no reviews
            this.reviews = [];
            this.serviceReviewsCount = 0;
            this.sellerReviewsCount = 0;
          }
        }
      },
      error: (err) => {
        console.error('Error fetching gig data', err);
      },
    });
  }

  // constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  // ngOnInit(): void {
  //   // Get the gig id from the URL params
  //   const gigId = this.route.snapshot.paramMap.get('id');
  //   if (gigId) {
  //     this.fetchGigData(gigId);
  //   }
  // }

  // fetchGigData(id: string): void {
  //   const url = `gigs/${id}`;
  //   this.http.get<GigResponse>(url).subscribe({
  //     next: (response) => {
  //       if (response.isSuccess && response.result) {
  //         const result = response.result;
  //         // Replace dummy data with API data if present
  //         if (result.title) {
  //           this.serviceTitle = result.title;
  //         }
  //         if (result.price) {
  //           this.servicePrice = result.price;
  //           this.basePrice = result.price; // update summary card base price too
  //         }
  //         if (result.user_id && result.user_id.email) {
  //           this.sellerName = result.user_id.email;
  //           this.userId = result.user_id._id;
  //         }
  //         // You can also update additional fields such as short_description or description if needed
  //         // For example, you might add properties like:
  //         // this.shortDescription = result.short_description;
  //         // this.longDescription = result.description;
  //         // Similarly, if the API returns reviews data, you can replace the dummy reviews:
  //         if (result.reviews && result.reviews.length > 0) {
  //           // Map or transform the API reviews as needed to match your Review interface
  //           this.reviews = result.reviews.map((rev: any) => ({
  //             name: rev.name, // if API gives a different property, adjust accordingly
  //             rating: rev.rating,
  //             date: rev.date,
  //             comment: rev.comment,
  //             avatar: rev.avatar,
  //           }));
  //         }
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching gig data', err);
  //     },
  //   });
  // }

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
    this.router.navigate(['/chat'], { queryParams: { recieverId: this.userId.toString() } });
  }
}
