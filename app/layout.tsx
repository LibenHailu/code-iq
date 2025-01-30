import '@aws-amplify/ui-react/styles.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import ConfigureAmplifyClientSide from '@/components/configure-amplify';
import { siteConfig } from '@/config/site';
import { AppProvider } from '@/providers/app';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL('http://localhost:3000/'),
  icons: [
    {
      url: '/logo/logo.svg',
      href: '/logo/logo.svg',
    },
  ],
};
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigureAmplifyClientSide>
          <AppProvider>{children}</AppProvider>
        </ConfigureAmplifyClientSide>
      </body>
    </html>
  );
}
