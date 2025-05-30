'use client';

import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";

export default function Home() {
  const { messages, isLoading, input, setInput, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header Section */}
      <section className="symbol-section text-center py-8">
        <div className="yin-yang text-6xl mb-4">☯</div>
        <h1 className="text-3xl font-bold font-serif">Xuan2.org</h1>
        <p className="mt-1 text-xl text-gray-600 font-serif">玄之又玄，众妙之门</p>
        <p className="mt-1 text-gray-500 italic text-sm">The gateway to profound mysteries</p>
      </section>

      {/* Chat Section */}
      <Card className="flex-1 flex flex-col overflow-hidden border border-gray-200 mb-4">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p className="font-serif text-lg">Ask your question about the Tao...</p>
              <p className="italic mt-2">
                "The journey of a thousand miles begins with a single step."
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => sendMessage(input)}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
}

