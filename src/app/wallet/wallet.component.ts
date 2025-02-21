import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent implements OnInit {
  balance: number = 0;
  balanceToAdd: number = 0;
  transactions: any = [];
  cards: any = [];
  currentCard = null;

  cardPayload = {
    cardNo: '',
    expiry: '',
    cvv: '',
  };

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([this.getTransactions(), this.getCards()]);
  }

  async getCards(): Promise<any> {
    try {
      const res: any = await this.apiService.getAllCard();
      if (res && res.isSuccess) {
        this.cards = res.result;
      }
    } catch (ex: any) {
      this.toastr.error('Error fetching cards.', 'Error');
    }
  }

  async getTransactions(): Promise<any> {
    try {
      this.balance = 0;
      const res: any = await this.apiService.getTransactions();
      if (res && res.isSuccess) {
        this.transactions = res.result;
        this.transactions
          .filter((x: any) => x.channel.type === 'topup')
          .forEach((xx: any) => {
            this.balance += xx.amount;
          });
      }
    } catch (ex: any) {
      this.toastr.error('Error fetching cards.', 'Error');
    }
  }

  async saveCard() {
    try {
      const res: any = await this.apiService.addCard(this.cardPayload);
      if (res && res.isSuccess) {
        this.toastr.success('Card added successfully', 'Success');
        await this.getCards();
        this.cardPayload = {
          cardNo: '',
          expiry: '',
          cvv: '',
        };
      }
    } catch (ex: any) {
      this.toastr.error('Error fetching cards.', 'Error');
    }
  }

  async addBalance() {
    try {
      const res: any = await this.apiService.addPayment({
        amount: this.balanceToAdd,
        type: 'topup',
        cardId: this.currentCard,
      });
      if (res && res.isSuccess) {
        this.toastr.success('Balance added successfully', 'Success');
        await this.getTransactions();
        this.balanceToAdd = 0;
        this.currentCard = null;
      }
    } catch (ex: any) {
      this.toastr.error('Error fetching cards.', 'Error');
    }
  }
}
