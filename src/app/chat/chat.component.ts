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
    recieverId = "";
    selectedChatId: string | null = null;
    isProvider = true;
    messageText = "";
    selectedChat = {} as any
    user = {} as any

    constructor(private chatService: ChatService, private route: ActivatedRoute, private localStorageService: LocalStorageService, private apiService: ApiService) { }

    async ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.recieverId = params.get('recieverId') || "";
        });

        this.user = this.localStorageService.getUser();
        this.isProvider = this.user.user_type === "ServiceProvider";
        this.userId = this.user._id

        const chats = await this.chatService.getAllThreadsForUser(this.userId);
        console.log(chats, "===chats")
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

    getFormattedTime(createdAt: number) {
        const date = new Date(createdAt);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    async selectChat(chatId: string) {
        this.selectedChatId = chatId;
        this.selectedChat = this.chatItems.find(chat => chat.id === chatId)!
        console.log(chatId, "===chatID")
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

    async provideQoutation() {
        await this.chatService.sendMessage(
            {
                chatId: this.selectedChatId!,
                text: "Sent Qoute : " + 250,
                senderId: this.userId,
                recieverId: this.recieverId,
                author: this.user.full_name,
                isEstimation: true
            },
        );
    }

    async acceptQoutation(msg: string) {
        const amount = msg.split(":")[1]

        const payload = {
            customer_id: this.selectedChat.customer_id,
            provider_id: this.selectedChat.provider_id,
            work_price: amount,
            job_id: this.selectedChat.job_id
        }
        const response = await this.apiService.acceptJob(payload)
        if (response.success) {
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
        }
    }

    async sendMessage() {
        let chatId = this.selectedChatId
        if (!this.selectedChatId && this.recieverId) {
            chatId = await this.startChat()
        }

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
        const customerId = this.isProvider ? this.recieverId : this.userId;
        const providerId = !this.isProvider ? this.recieverId : this.userId;
        const customerName = this.isProvider ? this.selectedChat.customerName : this.user.full_name;
        const providerName = this.isProvider ? this.user.full_name : (this.selectedChat.providerName || "Faraz Ahmed");

        console.log(providerName, "==providerName")

        this.selectedChatId = await this.chatService.startChat(customerId, providerId, customerName, providerName);

        this.chatService.listenToMessages(this.selectedChatId);
        this.chatService.messages$.subscribe(messages => {
            this.messages = messages.map(msg => ({
                ...msg,
                self: msg.senderId === this.userId,
                time: this.getFormattedTime(msg.createdAt),
            }));
        });

        console.log("Chat started with thread ID:", this.selectedChatId);
        return this.selectedChatId

    }

}
