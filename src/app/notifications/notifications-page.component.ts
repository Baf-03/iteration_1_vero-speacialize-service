import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent {
  // "New Notifications"
  newNotifications = [
    {
      iconLetter: 'Q',
      iconColor: '#FF6B00', // Orange
      title: 'Quotation Received',
      hasRedDot: true,
      message: 'James smith has send you a quote for $160.00',
      time: '2 hrs ago',
      showButtons: true // "Reject" / "Accept"
    },
    {
      iconLetter: 'O',
      iconColor: '#FF6B00', // Orange
      title: 'General Notification',
      hasRedDot: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      time: '2 hrs ago',
      showButtons: false
    }
  ];

  // "Past Notifications"
  pastNotifications = [
    {
      iconLetter: 'O',
      iconColor: '#2F4858', // Navy
      title: 'General Notification',
      hasRedDot: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      time: '2 days ago',
      showButtons: false
    },
    {
      iconLetter: 'O',
      iconColor: '#2F4858',
      title: 'General Notification',
      hasRedDot: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      time: '3 days ago',
      showButtons: false
    },
    {
      iconLetter: 'O',
      iconColor: '#2F4858',
      title: 'General Notification',
      hasRedDot: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      time: '5 days ago',
      showButtons: false
    },
    {
      iconLetter: 'O',
      iconColor: '#2F4858',
      title: 'General Notification',
      hasRedDot: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      time: '7 days ago',
      showButtons: false
    }
  ];
}
