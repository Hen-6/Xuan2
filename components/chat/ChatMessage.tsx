import { type Message } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "py-8 first:pt-0 last:pb-0",
      isUser ? "bg-white" : "bg-gray-50"
    )}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-4 items-start">
          <div className={cn(
            "rounded-full w-8 h-8 flex items-center justify-center text-white text-sm",
            isUser ? "bg-blue-500" : "bg-gray-700"
          )}>
            {isUser ? "U" : "A"}
          </div>
          <div className="flex-1 space-y-2">
            <div className="font-medium">
              {isUser ? "You" : "Assistant"}
            </div>
            <div className="prose prose-sm max-w-none">
              {message.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 