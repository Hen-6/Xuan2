import { type Message } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "px-4 md:px-6 py-6",
      isUser ? "bg-white" : "bg-gray-50"
    )}>
      <div className="max-w-3xl mx-auto flex gap-6 items-start">
        <div className={cn(
          "shrink-0 select-none w-7 h-7 rounded-sm flex items-center justify-center text-sm",
          isUser ? "bg-black text-white" : "bg-teal-600 text-white"
        )}>
          {isUser ? "Y" : "X"}
        </div>
        <div className="min-w-0">
          <div className="prose prose-neutral max-w-none">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
} 