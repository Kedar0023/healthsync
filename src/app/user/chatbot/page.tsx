'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Navbar from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { trpc } from '@/tRPC/client/client';
import { toast } from 'sonner';

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
            content: "Hello! I'm your health assistant . How can I support you today?",
            timestamp: new Date(),
        }
    ]);

    const generateMutation = trpc.AI.generateWithAI.useMutation({
        onSuccess: (response) => {
            const newAssistantMessage: Message = {
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, newAssistantMessage]);
        },
        onError: (error) => {
            toast.error('Failed to generate response: ' + error.message);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newUserMessage: Message = {
            role: 'user',
            content: message,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newUserMessage]);
        setMessage('');

        try {
            await generateMutation.mutate({ prompt: message });
        } catch (error) {
            console.error('Error generating response:', error);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <div className="sticky top-16 h-[95%] bg-green-200">
                    <Sidebar />
                </div>
                <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
                    <main className="flex-1 overflow-auto p-4">
                        <h5 className='text-3xl font-bold pl-10 '>AI Health Assistant</h5>
                        <p className="mb-5 pl-10">An intelligent virtual assistant designed to provide trusted health information,</p>
                        <div className="space-y-4 max-w-3xl mx-auto ">
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
                                        <p className="text-xs opacity-50">
                                            {msg.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {generateMutation.isPending && (
                                <div className="flex justify-start">
                                    <div className="bg-muted rounded-lg px-4 py-2">
                                        <p>Thinking...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>

                    <footer className="border-t p-4">
                        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-4">
                            <Input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1"
                                disabled={generateMutation.isPending}
                            />
                            <Button type="submit" disabled={generateMutation.isPending}>
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