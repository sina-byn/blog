import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

export const dynamic = 'force-static';

// * components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InlineScript from '@/components/InlineScript';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: "Sina Bayandorian's Portfolio",
    template: '%s | Sina Bayandorian',
  },
  description: "Sina Bayandorian's portfolio and blog built with Next.js and MDX",
};

// * types
type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <InlineScript src='./src/assets/theme.js' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
