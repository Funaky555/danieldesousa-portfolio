import type { Metadata } from "next";
import { CoachLabApp } from "@/components/coach-lab/coach-lab-app";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Coach Lab | Daniel de Sousa",
  description:
    "Interactive tactical board for football coaching — formations, drawings, keyframes and tactical planning.",
};

export default function CoachLabPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <CoachLabApp />
      </main>
    </>
  );
}
