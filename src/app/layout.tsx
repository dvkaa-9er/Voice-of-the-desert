import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],   // cyrillic covers Mongolian script
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Voice of the Desert | UNCCD COP17 Initiative',
  description:
    'A global expedition across 7 Eurasian deserts — uniting ultra-endurance sport, science, and documentary media to combat desertification.',
  keywords: ['UNCCD', 'COP17', 'desertification', 'Mongolia', 'Voice of the Desert', 'climate'],
  icons: [
    { rel: 'icon', url: '/voice-of-the-desert-mark.svg', type: 'image/svg+xml' },
    { rel: 'icon', url: '/logo.png' },                 // PNG fallback for older browsers
    { rel: 'apple-touch-icon', url: '/logo.png' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable}`}>
      <body className="min-h-full bg-obsidian text-white">{children}</body>
    </html>
  )
}
