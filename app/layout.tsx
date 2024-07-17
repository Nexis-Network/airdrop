import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import { Providers } from '@/components/providers';

const monaSans = localFont({
  src: './MonaSans.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
})

const pixeloidSans = localFont({
  src: './PixeloidSans.ttf',
  display: 'swap',
  variable: '--font-pixeloid-sans',
})

export const metadata: Metadata = {
  title: "Nexis Airdrop",
  description: "Join the Nexis Airdrop program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} ${pixeloidSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
