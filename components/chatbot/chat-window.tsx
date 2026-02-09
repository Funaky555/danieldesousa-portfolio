"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "@/components/providers/i18n-provider";
import { findBestAnswer, fallbackMessages } from "@/lib/chatbot-engine";
import { quickSuggestions } from "@/lib/chatbot-faq";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const welcomeMessages: Record<string, string> = {
  en: "Hello! I'm Daniel's virtual assistant. Ask me about his coaching experience, philosophy, services, or how to get in touch!",
  pt: "Ola! Sou o assistente virtual do Daniel. Pergunte-me sobre a sua experiencia, filosofia de treino, servicos ou como contactar!",
  es: "Hola! Soy el asistente virtual de Daniel. Pregunteme sobre su experiencia, filosofia, servicios o como contactarlo!",
  fr: "Bonjour ! Je suis l'assistant virtuel de Daniel. Posez-moi des questions sur son experience, sa philosophie ou ses services !",
  zh: "你好！我是Daniel的虚拟助手。欢迎询问有关他的教练经验、理念、服务或联系方式！",
};

const chatLabels: Record<string, { placeholder: string }> = {
  en: { placeholder: "Ask me anything..." },
  pt: { placeholder: "Pergunte-me algo..." },
  es: { placeholder: "Pregunteme algo..." },
  fr: { placeholder: "Posez-moi une question..." },
  zh: { placeholder: "问我任何问题..." },
};

export function ChatWindow() {
  const { locale } = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: welcomeMessages[locale] || welcomeMessages["en"],
    },
  ]);

  const suggestions = quickSuggestions[locale] || quickSuggestions["en"];
  const labels = chatLabels[locale] || chatLabels["en"];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(
    (text: string) => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
      };

      const answer = findBestAnswer(text, locale);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: answer || fallbackMessages[locale] || fallbackMessages["en"],
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
    },
    [locale]
  );

  const showSuggestions = messages.length <= 1;

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}

        {/* Quick suggestions */}
        {showSuggestions && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSend(suggestion)}
                className="text-xs px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/50">
        <ChatInput onSend={handleSend} placeholder={labels.placeholder} />
      </div>
    </div>
  );
}
