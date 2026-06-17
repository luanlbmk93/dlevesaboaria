import type { Metadata } from 'next';
import './globals.css';
import './site.css';
import SiteShell from '@/components/site/SiteShell';

export const metadata: Metadata = {
  title: "D'Leve | Saboaria Artesanal",
  description: "Saboaria artesanal feita à mão com ingredientes naturais. Bem-estar consciente em cada detalhe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
