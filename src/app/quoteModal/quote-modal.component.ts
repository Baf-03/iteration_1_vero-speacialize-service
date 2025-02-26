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
  showModal = false;
  finalQuoteAmount: number | null = null;
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
  }

  onModalSubmit(): void {
    const parsed = parseFloat(this.amount);
    const finalAmount = isNaN(parsed) ? 0 : parsed;
    this.finalQuoteAmount = finalAmount;
    this.showModal = false;
  }

  onInputChange(event: any): void {
    let inputValue: string = event.target.value || '';
    inputValue = inputValue.replace(/[^0-9.]/g, '');
    const firstDecimalIndex = inputValue.indexOf('.');
    if (firstDecimalIndex !== -1) {
      inputValue =
        inputValue.substring(0, firstDecimalIndex + 1) +
        inputValue.substring(firstDecimalIndex + 1).replace(/\./g, '');
    }

    this.amount = inputValue;
  }
}
