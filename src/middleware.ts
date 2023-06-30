import { NextResponse } from 'next/server';
import { type UserRole } from '@/types';
import { clerkClient } from '@clerk/nextjs';
import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
	// Public routes are routes that don't require authentication
	publicRoutes: [
		'/iniciar-sesion(.*)',
		'/registro(.*)',
		'/sso-callback(.*)',
		'/api(.*)',
		// "/categories(.*)",
		// "/products(.*)",
		// "/build-a-board(.*)",
		// "/email-preferences(.*)",
	],
	async afterAuth(auth, req) {
		console.log(auth.userId);
		if (auth.isPublicRoute) {
			//  For public routes, we don't need to do anything
			return NextResponse.next();
		}

		const url = new URL(req.nextUrl.origin);

		if (!auth.userId) {
			//  If user tries to access a private route without being authenticated,
			//  redirect them to the sign in page
			url.pathname = '/iniciar-sesion';
			return NextResponse.redirect(url);
		}

		// Set the user's role to user if it doesn't exist
		const user = await clerkClient.users.getUser(auth.userId);

		if (!user) {
			throw new Error('No se encontró el usuario.');
		}

		// If the user doesn't have a role, set it to user
		if (!user.privateMetadata.role) {
			await clerkClient.users.updateUser(auth.userId, {
				privateMetadata: {
					...user.privateMetadata,
					role: 'user' satisfies UserRole,
				},
			});
		}
	},
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)'],
};
