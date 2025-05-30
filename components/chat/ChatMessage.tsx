import { type Message } from "@/hooks/useChat";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <Card className={cn(
        "max-w-[80%] p-4",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </Card>
    </div>
  );
} 