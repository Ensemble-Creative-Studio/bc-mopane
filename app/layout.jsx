
'use client'
import './globals.css'
import { ReactLenis } from "@studio-freight/react-lenis";


export const metadata = {
  title: 'Buffet Crampon - Mopane',
  description: 'Buffet Crampon ',
}

export default function RootLayout({
  children,
}) {
  return (
    <html>
    <head></head>
    <body className='overflow-hidden'>
    <ReactLenis root options={{ lerp: 0.08, wheelMultiplier: 0.8}}>
      <main  className='overflow-x-hidden'>{children}</main>
      </ReactLenis>
    </body>
      </html>
  )
}
