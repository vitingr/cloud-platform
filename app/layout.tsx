import './globals.css'
import type { Metadata } from 'next'
import Provider from '@/components/Provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cloud Project',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className='bg-white'>
        <Provider>
          <Navbar />
          <div className="main">
            <div className='gradient' />
          </div>
          <main className='main-container min-h-[72vh] flex justify-center'>
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
