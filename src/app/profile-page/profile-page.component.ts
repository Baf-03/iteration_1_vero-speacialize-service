import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Gig {
  title: string;
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
export class ProfilePageComponent implements OnInit {
  // Safely retrieve user data from localStorage
  user: any = {};
  
  // Hero Section (Fixed)
  heroBannerUrl = 'https://media.licdn.com/dms/image/v2/C561BAQHS961kXf5sjA/company-background_10000/company-background_10000/0/1635378826217/cover_genius_cover?e=2147483647&v=beta&t=eyjurIzUddEmGepg99eyr4WCzQZPN0G6Ulwb7zXyQq4';

  // Initialize variables safely, default to empty or fallback values
  userAvatarUrl: string = 'https://specializeservice.s3.amazonaws.com/avatar/44453b9c-ad85-4bcf-9ab5-f9781b481ddf-1583347991345-irfanali.jpg'; // default avatar URL
  userName: string = 'User';
  userRole: string = 'ServiceProvider';

  // Other profile data (from localStorage or default values)
  userRating: number = 4.6;
  userReviewsCount: string = '568k';

  // About Section Data
  aboutFullName: string = 'Full Name';
  aboutStatus: string = 'Active';
  aboutRole: string = 'Role';
  aboutCountry: string = 'USA';
  aboutLanguages: string = 'English';

  // Job Profile Fields
  companyName: string = 'My Handy Services';
  workEmail: string = 'Email not provided';
  workPhone: string = '+923132568891';
  totalExperience: string = '20 Yrs';
  website: string = 'www.myhandyservices.com';
  location: string = 'San Francisco, California';

  // Services list
  services: string[] = ['Cleaning', 'Plumbing', 'Electrical', 'Roofing'];

  // Gigs Data (Initially empty)
  gigs: Gig[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Attempt to load user data from localStorage safely
    const userFromLocalStorage = localStorage.getItem('user');
    console.log("user", userFromLocalStorage)
    if (userFromLocalStorage) {
      this.user = JSON.parse(userFromLocalStorage);
      console.log("this", this.user.user.avatar)

      // Safely assign the values from localStorage
      this.userAvatarUrl = this.user.user.avatar || this.userAvatarUrl;  // Use fallback if no avatar in localStorage
      this.userName = this.user.user.full_name || 'User';
      this.userRole = this.user.user.user_type || 'ServiceProvider';
      this.aboutFullName = this.user.user.full_name || 'Full Name';
      this.aboutRole = this.user.user.user_type || 'Role';
      this.workEmail = this.user.user.email || 'Email not provided';
      this.workPhone = this.user.user.mobile_number || '+923132568891';
    } else {
      console.error('User data not found in localStorage!');
    }

    this.fetchGigs(); // Fetch gigs when the component initializes
  }

  // Fetch Gigs from API
  fetchGigs(): void {
    this.http.get<any>('gigs/my-gigs').subscribe((response) => {
      if (response.isSuccess) {
        this.gigs = response.result.map((gig: any) => ({
          title: gig.title,
          description: gig.description,
          rating: gig.current_rating,
          reviews: gig.reviews.length > 0 ? gig.reviews.length.toString() : '0',
          price: gig.price,
          imageUrl: 'https://via.placeholder.com/150',  // Use a placeholder or an actual image URL
          isLiked: false,  // Default to false
        }));
      } else {
        console.error('Failed to fetch gigs from API');
      }
    });
  }

  // "Message" button click handler
  onMessage(): void {
    alert('Message clicked!');
  }

  // "Like" toggle for gigs
  toggleLike(gig: Gig) {
    gig.isLiked = !gig.isLiked;
  }
}
