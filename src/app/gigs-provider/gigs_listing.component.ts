import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vero-handyman',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gigs_listing.component.html',
  styleUrls: ['./app-vero-handyman.component.scss']
})
export class GigsListing{

  // Dummy data for Gigs (Most popular)
  popularGigs = [
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
  ];

  // Dummy data for Gigs (You may like)
  recommendedGigs = [
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
  ];

  onSubscribe(emailInput: HTMLInputElement) {
    const email = emailInput.value.trim();
    if (email) {
      alert(`Subscribed with: ${email}`);
      emailInput.value = '';
    }
  }

  onAction(gig: any) {
    alert(`Action triggered for: ${gig.name}`);
  }

  toggleLike(gig:any) {
    gig.isLiked = !gig.isLiked;
  }
  
}
