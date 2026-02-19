import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentForge | Build Your AI Swarm",
  description: "Professional AI Agent Marketplace & Swarm Builder - Design, deploy, and manage autonomous agent swarms with ease",
  keywords: ["AI agents", "swarm", "agent builder", "autonomous agents", "DeFi", "trading"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#030307] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
