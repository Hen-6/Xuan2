'use client';

import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";

export default function Home() {
  const { messages, isLoading, input, setInput, sendMessage } = useChat();

  return (
    <div className="flex h-screen bg-white">
      {/* Left sidebar - can be empty for now */}
      <div className="hidden md:flex w-[260px] bg-gray-900 flex-col">
        <div className="flex-1">
          <h1 className="px-4 py-4 text-white font-semibold text-xl">Xuan2</h1>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden border-b border-gray-200 p-4">
          <h1 className="text-xl font-semibold">Xuan2</h1>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-3 px-4">
                <h2 className="text-2xl font-semibold">Welcome to Xuan2</h2>
                <p className="text-gray-600">Ask me anything about the Tao...</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <div className="p-8 flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-gray-100 p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => sendMessage(input)}
              isLoading={isLoading}
            />
            <div className="mt-2 text-center text-xs text-gray-400">
              Built with Next.js and OpenRouter AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

