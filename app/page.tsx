'use client';

import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const { messages, isLoading, input, setInput, sendMessage } = useChat();
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left sidebar */}
      <div 
        className="hidden md:flex flex-col bg-gray-900"
        style={{ width: 'var(--sidebar-width)' }}
      >
        <div className="flex-1">
          <h1 className="px-4 py-4 text-white font-semibold text-xl">Xuan2</h1>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden border-b border-gray-200 p-4 bg-background/80 backdrop-blur-sm">
          <h1 className="text-xl font-semibold">Xuan2</h1>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center p-4">
              <div className="text-center space-y-3 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold">Welcome to Xuan2</h2>
                <p className="text-muted-foreground">Ask me anything about the Tao...</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <div className="p-8 flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto p-4 md:p-6">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => sendMessage(input)}
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

