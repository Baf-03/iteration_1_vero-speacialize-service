import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../shared/local-storage.service';
import { ApiService } from '../shared/api.service';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    chatItems: any[] = [];
    messages: any[] = [];
    userId = "";
    messageId = ""
    recieverId = "";
    gigId = ""
    jobId = ""
    providerName = ""
    selectedChatId: string | null = null;
    isProvider = true;
    messageText = "";
    selectedChat = {} as any
    user = {} as any
    showModal = false
    amount = ""
    finalQuoteAmount = 0

    constructor(private chatService: ChatService, private route: ActivatedRoute, private localStorageService: LocalStorageService, private apiService: ApiService) { }

    async ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.gigId = params.get('gigId') || "";
            this.jobId = params.get('jobId') || "";
        });

        this.user = this.localStorageService.getUser();
        this.isProvider = this.user.user_type === "ServiceProvider";
        this.userId = this.user._id

        this.fetchChat()

        if (this.gigId) {
            await this.fetchGigDetails()
            const chatId = await this.startChat()
            this.selectChat(chatId)
        }


        // if (this.jobId) {
        //     this.fetchJobDetails()
        // }
    }

    async fetchChat() {
        const chats = await this.chatService.getAllThreadsForUser(this.userId);

        this.chatItems = chats.map((chat: any) => ({
            ...chat,
            name: chat.customer_id === this.userId ? chat.providerName : chat.customerName,
            time: this.getFormattedTime(chat.created_at),
            chatId: chat.id,
        }));

        const selectedChat = chats.find((chat) => {
            if (this.isProvider) {
                return chat.provider_id === this.userId && chat.customer_id === this.recieverId
            } else {
                return chat.customer_id === this.userId && chat.provider_id === this.recieverId
            }
        })
        if (selectedChat) {
            this.selectedChatId = selectedChat.id
            this.selectedChat = selectedChat
            this.selectChat(selectedChat.id)
        }
    }


    async fetchGigDetails() {
        const response = await this.apiService.fetchGig(this.gigId)
        if (response.isSuccess) {
            this.recieverId = response.result.user_id._id
            this.providerName = response.result.user_id.full_name
        }
    }

    getFormattedTime(createdAt: number) {
        const date = new Date(createdAt);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    async selectChat(chatId: string) {
        this.selectedChatId = chatId;
        this.selectedChat = this.chatItems.find(chat => chat.id === chatId)!

        this.recieverId = this.isProvider ? this.selectedChat.customer_id : this.selectedChat.provider_id

        this.chatService.listenToMessages(chatId);
        this.chatService.messages$.subscribe(messages => {
            this.messages = messages.map((msg: any) => {
                return {
                    ...msg,
                    self: msg.senderId === this.userId,
                    time: this.getFormattedTime(msg.createdAt),
                }
            });
        });
    }

    async requestQuote() {
        await this.chatService.sendMessage(
            {
                chatId: this.selectedChatId!,
                text: "Requested a Qoute",
                senderId: this.userId,
                recieverId: this.recieverId,
                author: this.user.full_name,
                isAskEstimation: true
            },
        );
    }

    async provideQoutation(msgId: string) {
        // await this.chatService.sendMessage(
        //     {
        //         chatId: this.selectedChatId!,
        //         text: "Sent Qoute : " + 250,
        //         senderId: this.userId,
        //         recieverId: this.recieverId,
        //         author: this.user.full_name,
        //         isEstimation: true
        //     },
        // );
        this.openModal()
        this.messageId = msgId
    }

    async acceptQoutation(msg: string, msgId: string) {
        const amount = msg.split(": ")[1]

        const payload = {
            customer_id: this.selectedChat.customer_id,
            provider_id: this.selectedChat.provider_id,
            work_price: amount,
            job_id: this.selectedChat.job_id || this.jobId
        }

        const response = await this.apiService.acceptJob(payload);
        if (response.isSuccess) {
            await this.chatService.sendMessage(
                {
                    chatId: this.selectedChat.id!,
                    text: "accept the quotation",
                    senderId: this.userId,
                    recieverId: this.recieverId,
                    author: this.user.full_name,
                    isStatus: true
                },
            );
            this.chatService.responsdMessage(msgId, this.selectedChat.id!)
        }
    }

    async rejectQuotation(id: string) {
        await Promise.all([
            this.chatService.responsdMessage(id, this.selectedChat.id!),
            this.chatService.sendMessage(
                {
                    chatId: this.selectedChat.id!,
                    text: "Rejected the quotation",
                    senderId: this.userId,
                    recieverId: this.recieverId,
                    author: this.user.full_name,
                    isStatus: true
                },
            )
        ])

    }

    async sendMessage() {
        let chatId = this.selectedChatId
        // if (!this.selectedChatId && this.recieverId) {
        //     chatId = await this.startChat()
        // }

        await this.chatService.sendMessage(
            {
                chatId: chatId!,
                text: this.messageText,
                senderId: this.userId,
                recieverId: this.recieverId,
                author: this.user.full_name,
                isAskEstimation: false
            },
        );

        this.messageText = "";
    }

    async startChat() {
        // const customerId = this.isProvider ? this.recieverId : this.userId;
        // const providerId = !this.isProvider ? this.recieverId : this.userId;
        // const customerName = this.isProvider ? this.selectedChat.customerName : this.user.full_name;
        // const providerName = this.isProvider ? this.user.full_name : (this.selectedChat.providerName || "Faraz Ahmed");

        const customerId = this.userId
        const providerId = this.recieverId
        const customerName = this.user.full_name
        const providerName = this.providerName

        console.log({ customerId, providerId, customerName, providerName }, "===details")
        this.selectedChatId = await this.chatService.startChat(customerId, providerId, customerName, providerName, this.jobId);

        this.chatService.listenToMessages(this.selectedChatId);
        this.chatService.messages$.subscribe(messages => {
            this.messages = messages.map(msg => ({
                ...msg,
                self: msg.senderId === this.userId,
                time: this.getFormattedTime(msg.createdAt),
            }));
        });

        return this.selectedChatId

    }

    openModal(): void {
        this.finalQuoteAmount = 0
        this.amount = ""
        this.showModal = true;
    }

    onModalCancel(): void {
        this.showModal = false;
    }

    async onModalSubmit() {
        const parsed = parseFloat(this.amount);
        const finalAmount = isNaN(parsed) ? 0 : parsed;
        this.finalQuoteAmount = finalAmount;

        this.chatService.responsdMessage(this.messageId, this.selectedChat.id!),


            await this.chatService.sendMessage(
                {
                    chatId: this.selectedChatId!,
                    text: "Sent Qoute : " + this.finalQuoteAmount,
                    senderId: this.userId,
                    recieverId: this.recieverId,
                    author: this.user.full_name,
                    isEstimation: true
                },
            );

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
