import { useState } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const API_KEY = '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';
const MODEL = 'qwen/qwen2.5-vl-3b-instruct:free';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = { role: 'user', content: message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': 'https://xuan2.org',
          'X-Title': 'Xuan2 Chat'
        },
        body: JSON.stringify({
          model: MODEL,
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message to chat
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    input,
    setInput,
    sendMessage,
  };
} 