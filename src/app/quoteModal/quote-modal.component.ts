import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-modal-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-modal.component.html',
  styleUrls: ['./quote-modal.component.scss']
})
export class QuoteModalPageComponent implements OnInit {
  // Controls whether the modal is visible
  showModal = false;
  // Stores the final submitted quote amount
  finalQuoteAmount: number | null = null;
  // Bound to the modal input field
  amount: string = '150.00';

  ngOnInit(): void {
    this.amount = '150.00';
  }

  // Opens the modal
  openModal(): void {
    this.showModal = true;
  }

  // Closes the modal on cancel
  onModalCancel(): void {
    this.showModal = false;
    console.log('Modal canceled');
  }

  // Closes the modal on submit and saves the amount
  onModalSubmit(): void {
    const parsed = parseFloat(this.amount);
    const finalAmount = isNaN(parsed) ? 0 : parsed;
    this.finalQuoteAmount = finalAmount;
    this.showModal = false;
    console.log('Modal submitted with amount:', finalAmount);
  }

  // Filters input to allow only digits and at most one decimal point
  onInputChange(event: any): void {
    let inputValue: string = event.target.value || '';

    // Remove all characters except digits and decimal point
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Allow only one decimal point
    const firstDecimalIndex = inputValue.indexOf('.');
    if (firstDecimalIndex !== -1) {
      inputValue =
        inputValue.substring(0, firstDecimalIndex + 1) +
        inputValue.substring(firstDecimalIndex + 1).replace(/\./g, '');
    }

    this.amount = inputValue;
  }
}
