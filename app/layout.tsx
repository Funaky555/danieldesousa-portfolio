import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "next-themes"
import { I18nProvider } from "@/components/providers/i18n-provider"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { FootballCursor } from "@/components/football-cursor"
import { CoachLabFAB } from "@/components/coach-lab/coach-lab-fab"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daniel de Sousa | Professional Football Coach',
  description: 'UEFA B Football Coach with 10+ years experience in Portugal and China. Youth development specialist offering game analysis, scouting, and coaching consultancy.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <I18nProvider>
            {children}
            <ChatWidget />
            <CoachLabFAB />
            <FootballCursor />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
