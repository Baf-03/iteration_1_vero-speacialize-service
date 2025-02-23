import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vero-handyman',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './gigs_listing.component.html',
  styleUrls: ['./app-vero-handyman.component.scss']
})
export class GigsListing implements OnInit {
  // Data arrays for gigs
  popularGigs: any[] = [
    {
      name: 'Jessica Strike',
      level: 'Level 1 Seller',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
      isLiked: false
    },
    {
      name: 'Jessica Strike',
      level: 'Level 1 Seller',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
      isLiked: false
    },
    {
      name: 'Jessica Strike',
      level: 'Level 1 Seller',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
      isLiked: false
    },
    {
      name: 'Jessica Strike',
      level: 'Level 1 Seller',
      description: 'Expert solutions to repair or replace your faucets, fixtures, & pipes, keeping your flow flawless!',
      rating: 4.6,
      reviews: '568k',
      price: 62,
      imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid',
      isLiked: false
    }
    // ... additional dummy gigs if needed
  ];
  
  // Recommended gigs fetched from the API
  recommendedGigs: any[] = [];

  // Default job id in case query param is not provided
  private defaultJobId = '67b64b35f0c3382e687554a8';

  // Dummy values for image and rating if not provided in API response
  private dummyImageUrl = 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid';
  private dummyRating = 4.6;
  private dummyReviews = '568k';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRecommendedGigs();
  }

  // Retrieve access token and user id from localStorage
  private getToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  private getUserId(): string | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.user._id;
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
      }
    }
    return null;
  }

  // Fetch gigs for the given job id from the API
  fetchRecommendedGigs(): void {
    // Check for jobId query parameter; use default if not present
    const jobIdFromUrl = this.route.snapshot.queryParamMap.get('jobId');
    const jobId = jobIdFromUrl ? jobIdFromUrl : this.defaultJobId;

    const apiUrl = `gigs/matched/${jobId}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    this.http.get<any>(apiUrl, { headers }).subscribe({
      next: (res) => {
        if (res.isSuccess && res.result && Array.isArray(res.result)) {
          // Take the whole gigs array from the response
          const gigs = res.result;

          // Use the first 4 for popular gigs
          // (If you want to preserve the dummy popular gigs, you could instead merge the values.)
          this.popularGigs = gigs.slice(0, 4).map((gig:any) => ({
            ...gig,
            // Fallback to dummy values if not provided
            imageUrl: this.dummyImageUrl,
            rating: this.dummyRating,
            reviews: this.dummyReviews,
            isLiked: false
          }));

          // If there are more than 4 gigs, use the remaining ones for recommended gigs
          this.recommendedGigs = gigs.length > 4 ? gigs.slice(4).map((gig:any) => ({
            ...gig,
            imageUrl: this.dummyImageUrl,
            rating: this.dummyRating,
            reviews: this.dummyReviews,
            isLiked: false
          })) : [];
        } else {
          console.error('Failed to fetch recommended gigs', res);
        }
      },
      error: (err) => {
        console.error('Error fetching recommended gigs', err);
      }
    });
  }

  // Subscribe action for newsletter
  onSubscribe(emailInput: HTMLInputElement): void {
    const email = emailInput.value.trim();
    if (email) {
      alert(`Subscribed with: ${email}`);
      emailInput.value = '';
    }
  }

  // Navigate to gig details when hamburger button is clicked
  onAction(gig: any): void {
    // Use gig.id to navigate; if gig.id is not available, you may fallback or show an error.
    if (gig && gig._id) {
      this.router.navigate(['/gigs-info/user', gig._id]);
    } else {
      console.error('Gig id is missing', gig);
    }
  }

  // Toggle "like" state on a gig
  toggleLike(gig: any): void {
    gig.isLiked = !gig.isLiked;
  }
}
