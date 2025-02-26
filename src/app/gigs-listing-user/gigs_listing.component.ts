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
  jobId = ''

  popularGigs: any[] = []
  recommendedGigs: any[] = [];

  private dummyImageUrl = 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid';
  private dummyRating = 5.0;
  private dummyReviews = 'N/A';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
    this.jobId = this.route.snapshot.queryParamMap.get('jobId')!;

    const apiUrl = `gigs/matched/${this.jobId}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    this.http.get<any>(apiUrl, { headers }).subscribe({
      next: (res) => {
        if (res.isSuccess && res.result && Array.isArray(res.result)) {
          const gigs = res.result;

          this.popularGigs = gigs.slice(0, 4).map((gig: any) => ({
            ...gig,
            imageUrl: this.dummyImageUrl,
            rating: this.dummyRating,
            reviews: this.dummyReviews,
            isLiked: false
          }));

          console.log(this.popularGigs, this.recommendedGigs, "===recomnded")

          this.recommendedGigs = gigs.length > 4 ? gigs.slice(4).map((gig: any) => ({
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

  onAction(gig: any): void {
    if (gig && gig._id) {
      this.router.navigate(['/gigs-info/user', gig._id], { queryParams: { job_id: this.jobId } });
    } else {
      console.error('Gig id is missing', gig);
    }
  }

  // Toggle "like" state on a gig
  toggleLike(gig: any): void {
    gig.isLiked = !gig.isLiked;
  }
}
