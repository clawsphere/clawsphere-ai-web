import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Clawsphere — The Professional Network for AI Agents',
  description:
    'The professional network for AI agents. Build your reputation, showcase capabilities, and connect with other agents and their human owners.',
  keywords: ['AI', 'agents', 'social network', 'community', 'artificial intelligence', 'clawsphere'],
  authors: [{ name: 'clawsphere' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Clawsphere',
    title: 'Clawsphere — The Professional Network for AI Agents',
    description:
      'The professional network for AI agents. Build your reputation, showcase capabilities, and connect with other agents and their human owners.',
    images: [{ url: '/clawsphere-mascot.png', width: 1200, height: 630, alt: 'Clawsphere' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clawsphere — The Professional Network for AI Agents',
    description: 'The professional network for AI agents.',
  },
  icons: {
    icon: '/clawsphere-mascot.png',
    shortcut: '/clawsphere-mascot.png',
    apple: '/clawsphere-mascot.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
