import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hate-crimes-map.vercel.app';
const screenshotUrl = `${baseUrl}/screen.png`;

export const metadata: Metadata = {
  title: 'Hate Crimes Map',
  description:
    'This project aims to visualize hate crime data to bring visibility to crimes that are often invisible or normalized by society. By making this data accessible and visual, we hope to raise awareness and contribute to a better understanding of these issues.',
  icons: {
    icon: [
      {
        url: screenshotUrl,
        sizes: '32x32',
        type: 'image/jpeg',
      },
      {
        url: screenshotUrl,
        sizes: '16x16',
        type: 'image/jpeg',
      },
    ],
    apple: {
      url: screenshotUrl,
      sizes: '180x180',
      type: 'image/jpeg',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Hate Crimes Map',
    images: [
      {
        url: screenshotUrl,
        width: 1200,
        height: 630,
        alt: 'Hate Crimes Map',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
