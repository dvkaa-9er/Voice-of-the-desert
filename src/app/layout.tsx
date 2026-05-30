import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Voice of the Desert | UNCCD COP17 Initiative',
  description:
    'A global expedition across 7 Eurasian deserts — uniting ultra-endurance sport, science, and documentary media to combat desertification.',
  keywords: ['UNCCD', 'COP17', 'desertification', 'Mongolia', 'Voice of the Desert', 'climate'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-obsidian text-white">{children}</body>
    </html>
  )
}
