import { NextRequest, NextResponse, userAgent } from 'next/server';
import { createClient } from '@/prismicio';

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.toString());
  // Get device information
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('device', viewport);

  // Get available locales from Prismic
  const client = createClient();
  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);
  const defaultLocale = locales[0];

  // Process URL and check for lang parameter
  const url = new URL(request.url);
  const langParam = url.searchParams.get('lang');

  // Handle ?lang=xx query parameter
  if (langParam && locales.includes(langParam)) {
    // Remove lang parameter for cleaner URL
    url.searchParams.delete('lang');
    
    // Create redirect response
    const response = NextResponse.redirect(url);
    
    // Set language cookie
    response.cookies.set('i18next', langParam);
    
    // Log language change (optional)
    try {
      fetch('https://api.socialbee.org/logging', {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
          location: 'language-middleware',
          data: {
            language: langParam,
          },
        }),
      });
    } catch (error) {
      // Silently fail if logging fails
    }
    
    return response;
  }

  // Continue with the request and set device header
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Match ALL paths, including root with query params
  matcher: ['/:path*'],
};