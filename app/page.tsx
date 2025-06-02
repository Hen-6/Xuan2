'use client';

import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";

export default function Home() {
  const { messages, isLoading, input, setInput, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 px-6">
        <h1 className="text-2xl font-serif text-center">Xuan2.org</h1>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-lg">Welcome to Xuan2</p>
                <p className="text-sm mt-2">Ask me anything about the Tao...</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 pt-4">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => sendMessage(input)}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-3 px-6">
        <p className="text-center text-sm text-gray-500">
          Built with Next.js and OpenRouter AI
        </p>
      </footer>
    </div>
  );
}

