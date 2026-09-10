import { Inter, Bebas_Neue } from 'next/font/google';
import { Providers } from './providers';
import { TopNav } from '@/components/TopNav';
import { BreakingNewsTicker } from '@indimba/ui/BreakingNewsTicker';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap' 
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://indimba.com'),
  title: {
    default: "Indimba — Africa's Story, Africa's Stage",
    template: '%s | Indimba'
  },
  description: "Zambia's digital home for entertainment, sports, music, and culture.",
  openGraph: {
    type: 'website',
    locale: 'en_ZM',
    siteName: 'Indimba',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className="bg-surface-900 text-white antialiased min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute 
                                            focus:top-4 focus:left-4 focus:z-[100] 
                                            focus:px-4 focus:py-2 focus:bg-indimba-red-500 
                                            focus:rounded-md focus:text-white">
          Skip to content
        </a>
        <Providers>
          <BreakingNewsTicker />
          <TopNav />
          <main id="main-content" className="min-h-[calc(100vh-300px)]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
