import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import StyledComponentsRegistry from './registry'

const outfit = Outfit({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Ivi Alfajores | Cardápio Artesanal',
  description: 'Os melhores alfajores artesanais. Escolha os seus favoritos e faça seu pedido!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={outfit.className}>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#FFF9F0', color: '#3A2722' }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
