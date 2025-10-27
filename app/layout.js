import './globals.css'

export const metadata = {
  title: 'DistriSchool - Sistema de Gestão Escolar',
  description: 'Sistema de gestão escolar completo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
