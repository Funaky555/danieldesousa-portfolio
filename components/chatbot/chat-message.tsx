import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-ai-blue/20 text-ai-blue"
            : "bg-football-green/20 text-football-green"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>
      <div
        className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-ai-blue/15 text-foreground rounded-tr-sm"
            : "bg-secondary text-foreground rounded-tl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
