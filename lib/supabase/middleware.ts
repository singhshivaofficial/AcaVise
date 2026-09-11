import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
        if (headers) {
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
        }
      },
    },
  })

  // IMPORTANT: Do not run any code between createServerClient and
  // supabase.auth.getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const isAuthRoute =
    pathname.startsWith('/login') || pathname.startsWith('/signup')

  const isOnboardingRoute = pathname.startsWith('/onboarding')

  const isProtectedRoute = [
    '/dashboard',
    '/academics',
    '/targets',
    '/priority',
    '/planner',
    '/ai-assistant',
    '/settings',
    '/onboarding',
  ].some((path) => pathname === path || pathname.startsWith(path + '/'))

  // If unauthenticated and trying to access protected route -> go to /login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If authenticated
  if (user) {
    const isOnboardingCompleted = !!user.user_metadata?.onboarding_completed

    // If authenticated but not yet onboarded: force redirect to /onboarding
    if (!isOnboardingCompleted && !isOnboardingRoute && !pathname.startsWith('/auth')) {
      const url = request.nextUrl.clone()
      url.pathname = '/onboarding'
      return NextResponse.redirect(url)
    }

    // If already onboarded, prevent access to /login, /signup, or /onboarding
    if (isOnboardingCompleted && (isAuthRoute || isOnboardingRoute)) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

