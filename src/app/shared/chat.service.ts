import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, onSnapshot, getDocs, addDoc, doc, setDoc, orderBy, Timestamp } from '@angular/fire/firestore';
import { or } from 'firebase/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private messagesSubject = new BehaviorSubject<any[]>([]);
    messages$ = this.messagesSubject.asObservable();

    constructor(private db: Firestore) { }

    async getAllThreadsForUser(userId: string): Promise<any[]> {
        const threadsCollection = collection(this.db, 'THREADS');

        const threadsQuery = query(threadsCollection, or(where('customer_id', '==', userId), where('provider_id', '==', userId)),
            // orderBy('created_at', 'desc')
        );
        // const providerThreadsQuery = query(threadsCollection, where('provider_id', '==', userId), orderBy('created_at', 'desc'));
        const threadSnapshot = await getDocs(threadsQuery);
        // const [customerThreadsSnapshot, providerThreadsSnapshot] = await Promise.all([
        //     getDocs(customerThreadsQuery),
        //     getDocs(providerThreadsQuery)
        // ]);

        const thread = threadSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return thread
        // const providerThreads = providerThreadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // return Array.from(new Map([...customerThreads, ...providerThreads].map(thread => [thread.id, thread])).values());
    }

    async getOrCreateThread(customerId: string, providerId: string, customerName: string, providerName: string) {
        const threadsCollection = collection(this.db, 'THREADS');

        const threadQuery = query(
            threadsCollection,
            where('customer_id', '==', customerId),
            where('provider_id', '==', providerId)
        );

        const response = await getDocs(threadQuery);
        const existingThread = response.docs[0];



        if (existingThread) {
            return { id: existingThread.id, ...existingThread.data() };
        } else {
            const newThreadRef = doc(threadsCollection);
            const newThread = {
                id: newThreadRef.id,
                customer_id: customerId,
                provider_id: providerId,
                customerName: customerName,
                providerName: providerName,
                created_at: Date.now(),
            };
            await setDoc(newThreadRef, newThread);
            return newThread;
        }
    }

    listenToMessages(chatId: string) {
        const messagesCollection = collection(this.db, `THREADS/${chatId}/MESSAGES`);
        const messagesQuery = query(messagesCollection, orderBy('createdAt', 'asc'));

        return onSnapshot(messagesQuery, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(messages, "===messages")
            this.messagesSubject.next(messages);
        });
    }

    async sendMessage({ chatId, text, senderId, recieverId, author, isAskEstimation, isEstimation, isStatus }: { chatId: string, text: string, senderId: string, recieverId: string, author: string, isAskEstimation?: boolean, isEstimation?: boolean, isStatus?: boolean }) {
        // const thread = await this.getOrCreateThread(customerId, providerId, customerName, providerName);
        // const chatId = thread.id;
        console.log(chatId, "===chat")

        const messageCollection = collection(this.db, `THREADS/${chatId}/MESSAGES`);

        const newMessage = {
            senderId,
            recieverId,
            text,
            createdAt: Date.now(),
            author,
            isAskEstimation: !!isAskEstimation,
            isEstimation: !!isEstimation,
            isStatus: !!isStatus
        };

        await addDoc(messageCollection, newMessage);
        console.log("Message sent successfully!");
    }

    async startChat(customerId: string, providerId: string, customerName: string, providerName: string) {
        const thread = await this.getOrCreateThread(customerId, providerId, customerName, providerName);
        return thread.id;
    }
}
