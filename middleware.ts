import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';

import { runWithAmplifyServerContext } from '@/utils/amplify-utils';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext(
    {
      nextServerContext: { request, response },
      operation: async (contextSpec) => {
        try {
          const session = await fetchAuthSession(
            contextSpec,
            {}
          );
          return session.tokens !== undefined;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
    }
  );

  if (!authenticated && !['/leaderboard', '/home'].includes(request.nextUrl.pathname) && !request.nextUrl.pathname.startsWith('/quizzes')) {
    return response;
  }


  if (authenticated) {
    return response;
  }

  return NextResponse.redirect(
    new URL('/', request.url)
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};
