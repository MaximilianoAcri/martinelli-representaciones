"use client";

import { usePathname } from "next/navigation";

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  return (
    <main className={`flex-1 pb-20 sm:pb-0 ${isHome ? "pt-0" : "pt-16"}`}>
      {children}
    </main>
  );
}