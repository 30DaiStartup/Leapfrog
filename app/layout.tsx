import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Leapfrog - P0-P1-P2 Demand Plane Visualization',
  description:
    'An interactive cinematic visualization demonstrating market transition dynamics from incumbent (P1) to leapfrog innovation (P2)',
  keywords: [
    'market dynamics',
    'adoption curve',
    'innovation',
    'market transition',
    'P0 P1 P2',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
