import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirecionar a raiz para /training
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/training', request.url))
  }

  return NextResponse.next()
}

// Configurar quais caminhos o middleware deve rodar
export const config = {
  matcher: ['/'],
}