"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "./chat-window";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[480px] sm:h-[520px] glass rounded-xl border border-border/50 shadow-2xl overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Daniel's Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-football-green/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-football-green" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Daniel&apos;s Assistant
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    FAQ Bot
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat content */}
            <ChatWindow />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-football-green text-white shadow-lg flex items-center justify-center hover:shadow-[0_0_30px_rgba(0,214,108,0.4)] transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
