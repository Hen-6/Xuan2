import { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading?: boolean;
}

export function ChatInput({ value, onChange, onSend, isLoading }: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex gap-2 items-end p-4 border-t">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question..."
        className="resize-none"
        rows={1}
        disabled={isLoading}
      />
      <Button 
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        size="icon"
      >
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
} 