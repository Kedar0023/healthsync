'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Navbar from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function ChatbotPage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hello! I’m your health assistant 🤖. How can I support you today?',
            timestamp: new Date(),
        },
        {
            role: 'user',
            content: 'Hi, I’ve been feeling tired lately. Any advice?',
            timestamp: new Date(),
        },
        {
            role: 'assistant',
            content: 'I’m sorry to hear that! 😟 Can you tell me more about your sleep, diet, or stress levels?',
            timestamp: new Date(),
        },
        {
            role: 'user',
            content: 'I sleep around 5 hours a night, and I skip meals sometimes.',
            timestamp: new Date(),
        },
        {
            role: 'assistant',
            content: 'That could definitely contribute to fatigue. Try aiming for 7-8 hours of sleep and regular meals. Would you like tips on improving sleep or meal planning? 🍎🛌',
            timestamp: new Date(),
        },
    ]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage: Message = {
            role: 'user',
            content: message,
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar/>
            <div className="flex flex-1">
                <div className="sticky top-16 h-[95%] bg-green-200">
                    <Sidebar />
                </div>
                <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]">

                    <main className="flex-1 overflow-auto p-4">
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "rounded-lg px-4 py-2 max-w-[80%]",
                                            msg.role === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        <p>{msg.content}</p>
                                        <span className="text-xs opacity-50">
                                            {msg.timestamp.toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>

                    {/* Message Input */}
                    <footer className="border-t p-4">
                        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-4">
                            <Input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1"
                            />
                            <Button type="submit">
                                <Send className="h-4 w-4 mr-2" />
                                Send
                            </Button>
                        </form>
                    </footer>
                </div>
            </div>
        </div>

    );
} 