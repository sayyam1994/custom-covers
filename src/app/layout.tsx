import type { Metadata } from 'next'
import { Recursive } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/components/providers'
import { constructMetadata } from '@/lib/utils'

const recursive = Recursive({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />{' '}
        <main className="flex flex-col min-h-[calc(100vh-3rem-1px)] grainy-light">
          <div className="flex flex-1 flex-col h-full">
            <Providers>{children}</Providers>
          </div>
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
