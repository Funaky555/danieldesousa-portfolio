"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export function ChatInput({ onSend, placeholder, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-background/50 border-border/50 text-sm"
        aria-label={placeholder}
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !value.trim()}
        className="shrink-0 bg-football-green hover:bg-football-green/80 text-white"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
