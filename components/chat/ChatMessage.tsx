'use client';

import { User, Bot } from 'lucide-react';

type ChatMessageProps = {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'bg-accent/10' : 'bg-background'} p-6`}>
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="font-medium">{isUser ? 'You' : 'Xuan2'}</div>
        <div className="text-muted-foreground whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
} 