import { KeyboardEvent, useRef, useEffect } from "react";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSend();
      }
    }
  };

  const handleSend = () => {
    if (value.trim() && !isLoading) {
      onSend();
      textareaRef.current?.focus();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [value]);

  return (
    <div className="relative flex items-end w-full bg-white rounded-xl border shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-shadow">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message Xuan2..."
        className="min-h-[52px] w-full resize-none bg-transparent py-[1.3rem] pl-4 pr-14 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 shadow-none"
        rows={1}
        disabled={isLoading}
      />
      <Button
        onClick={handleSend}
        disabled={isLoading || !value.trim()}
        size="icon"
        className="absolute right-2 bottom-2.5 h-8 w-8 bg-black hover:bg-gray-800 text-white rounded-lg disabled:opacity-40 disabled:hover:bg-black"
      >
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
} 