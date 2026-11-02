import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { BotaoWhatsapp } from "@/components/BotaoWhatsapp";
import { site } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://institutojoaodebarro.org.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.nome} | ${site.slogan}`, template: `%s | ${site.nome}` },
  description: site.descricao,
  openGraph: {
    title: site.nome,
    description: site.descricao,
    images: ["/img/joao-de-barro.jpg"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#1d1c17", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        <main>{children}</main>
        <Rodape />
        <BotaoWhatsapp />
      </body>
    </html>
  );
}
