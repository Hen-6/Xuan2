'use client';

import { useState } from 'react';
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const OPENROUTER_API_KEY = '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';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    // Add user message immediately
    const userMessage: Message = { role: 'user', content: content.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput(''); // Clear input
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin || 'https://hen-6.github.io/Xuan2',
          'X-Title': 'Xuan2 Chat',
        },
        body: JSON.stringify({
          model: 'qwen/qwen2.5-vl-3b-instruct:free',
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: 'Failed to parse error response' } }));
        console.error('OpenRouter API Error:', errorData);
        
        let errorMessage = 'Failed to get response from AI service';
        if (response.status === 401) {
          errorMessage = 'Authentication error. Please check the API key configuration.';
        } else if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json().catch(() => null);
      console.log('Received response:', data);

      if (!data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from AI service');
      }

      // Add AI response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      }]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pt-[var(--header-height)]">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto px-4">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-3 max-w-md">
                <h2 className="text-2xl font-semibold">Welcome to Xuan2</h2>
                <p className="text-muted-foreground">Ask me anything about the Tao...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-background/80 backdrop-blur-sm py-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={sendMessage}
              isLoading={isLoading}
            />
            <div className="mt-2 text-center text-xs text-muted-foreground">
              Built with Next.js and OpenRouter AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

