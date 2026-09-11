import { Inter, Bebas_Neue } from 'next/font/google';
import { Sidebar } from '@/components/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' });

export const metadata = {
  title: { default: 'Indimba Admin', template: '%s | Indimba Admin' },
  description: 'Content, moderation and analytics dashboard for Indimba OS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className="bg-surface-900 text-white antialiased min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 max-w-6xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
