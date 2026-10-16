import type { ReactNode } from 'react'

type AuthCardProps = {
  children: ReactNode
  className?: string
}

function AuthCard({ children, className }: AuthCardProps) {
  return (
    <section
      className={className}
      style={{
        width: 'min(100%, 343px)',
        padding: '40px 20px',
        borderRadius: '20px',
        background: 'linear-gradient(180deg, #7ec7ff 0%, #adffda 100%)',
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </section>
  )
}

export default AuthCard
