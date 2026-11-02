import type { Metadata } from "next";

export const metadata: Metadata = { title: "Painel de notícias", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "var(--areia)", minHeight: "100vh" }}>{children}</div>;
}
