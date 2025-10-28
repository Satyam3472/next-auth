import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';
 
export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET!) : null;

    console.log('Proxy Middleware Token', decodedToken);

    const { pathname } = request.nextUrl;

    if (!token && pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  
    if (token && (pathname === "/login" || pathname === "/signup")) {
        const res =  NextResponse.redirect(new URL("/profile", request.url));
        res.cookies.set('user', JSON.stringify(decodedToken), { httpOnly: false })
        return res;
    }

    return NextResponse.next();
}
 
export const config = {
  matcher: ['/profile/:path*',"/login","/signup",]
}