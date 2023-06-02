

import './globals.css'



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
    <body >
 
      <main className='overflow-x-hidden'>{children}</main>
    </body>
      </html>
  )
}
