import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Gig {
  name: string;
  description: string;
  rating: number;
  reviews: string;
  price: number;
  imageUrl: string;
  isLiked: boolean;
}

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  // Banner / Hero
  heroBannerUrl = 'https://media.licdn.com/dms/image/v2/C561BAQHS961kXf5sjA/company-background_10000/company-background_10000/0/1635378826217/cover_genius_cover?e=2147483647&v=beta&t=eyjurIzUddEmGepg99eyr4WCzQZPN0G6Ulwb7zXyQq4';
  userAvatarUrl = 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid';
  userName = 'Simon Lewis';
  userRating = 4.6;
  userReviewsCount = '568k';
  userRole = 'Vendor';

  // About section
  aboutFullName = 'John Doe';
  aboutStatus = 'Active';
  aboutRole = 'Cleaner';
  aboutCountry = 'USA';
  aboutLanguages = 'English';

  // Job Profile fields
  companyName = 'My Handy Services';
  workEmail = 'Simon.lewis@gmail.com';
  workPhone = '+1 (908) 1234 567';
  totalExperience = '20 Yrs';
  website = 'www.myhandyservices.com';
  location = 'SanFrancisco, California';

  // Services
  services = ['Cleaning', 'Plumbing', 'Electrical', 'Roofing'];

  // Gigs data
  gigs: Gig[] = [
    {
      name: 'Jessica Strike',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      isLiked: false,
    },
    {
      name: 'Jessica Strike',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      isLiked: false,
    },
    {
      name: 'Jessica Strike',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      isLiked: false,
    },
    {
      name: 'Jessica Strike',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      isLiked: false,
    },
    {
      name: 'Jessica Strike',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      isLiked: false,
    },
    {
      name: 'Jessica Strike',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      isLiked: false,
    },
    {
      name: 'Jessica Strike',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      isLiked: false,
    },
    {
      name: 'Jessica Strike',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      isLiked: false,
    },
  ];

  // Work coverage
  workCoverage = 'Bonded';

  // License image
  licenseImageUrl = 'https://via.placeholder.com/400x200?text=License';

  // "Message" button click
  onMessage(): void {
    alert('Message clicked!');
  }

  // "Like" toggle
  toggleLike(gig: Gig) {
    gig.isLiked = !gig.isLiked;
  }
}
