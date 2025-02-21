import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  name: string;
}

interface Note {
  text: string;
}

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

@Component({
  selector: 'app-part-time-cleaners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './part-time-cleaners.component.html',
  styleUrls: ['./part-time-cleaners.component.scss'],
})
export class PartTimeCleanersComponent {
  // Hero / Main Service Info
  serviceTitle = 'Part-time Cleaners';
  serviceRating = 4.6;
  serviceReviewsCount = '568k';
  servicePrice = 62.0; // per hour
  heroImageUrl = 'https://media.licdn.com/dms/image/v2/C561BAQHS961kXf5sjA/company-background_10000/company-background_10000/0/1635378826217/cover_genius_cover?e=2147483647&v=beta&t=eyjurIzUddEmGepg99eyr4WCzQZPN0G6Ulwb7zXyQq4'; // Dummy hero image

  // Seller Info
  sellerName = 'Jessica Strike';
  sellerServiceType = 'Premium cleaning service';
  sellerRating = 4.6;
  sellerAvatarUrl = 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid'; // Dummy avatar
  sellerReviewsCount = '568k';

  // Toggle for cleaning supplies
  hasCleaningSupplies = true;

  // Popular tasks
  tasks: Task[] = [
    { name: 'Bathroom Cleaning' },
    { name: 'Sofa / Carpet Vacuuming & Cleaning' },
    { name: 'Bed makeup & changing of linens' },
    { name: 'Mopping / Disinfection of floors & bathrooms' },
    { name: 'Dusting / Wiping of surfaces' },
    { name: 'Kitchen / dish area' },
  ];

  // Disclaimers
  notes: Note[] = [
    { text: 'Visiting / quotation charge if service is not availed $9 USD' },
    { text: 'Please manage your belongings for the security / building management prior to booking' },
    { text: 'Service might differ based on the service by the Vero Services Professional' },
  ];

  // Reviews and Ratings
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
    {
      name: 'Abraham Pape',
      rating: 4.2,
      date: 'Aug 23, 2023',
      comment:
        'Really amazing service. The cleaner arrived on time and was very thorough. Highly recommended!',
      avatar: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
    },
    {
      name: 'Sally Brown',
      rating: 5.0,
      date: 'Sep 2, 2023',
      comment:
        'Fantastic! Everything was spotless, and the cleaner was so polite. Will definitely use again.',
      avatar: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
    },
    {
      name: 'James Smith',
      rating: 4.0,
      date: 'Sep 10, 2023',
      comment:
        'They did a good job overall, though I wish they had spent a bit more time on the carpets. Still very satisfied!',
      avatar: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
    },
    {
      name: 'Mary Amazing',
      rating: 4.8,
      date: 'Sep 14, 2023',
      comment:
        'Absolutely love this service. The cleaner was super friendly and left everything sparkling. Worth every penny!',
      avatar: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
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
