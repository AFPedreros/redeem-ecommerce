import { type Metadata } from 'next';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OAuthSignIn } from '@/components/oauth-signin';
import { SignInForm } from '@/components/signin-form';
import { Shell } from '@/components/shell';
import { db } from '@/lib/firebase';

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign in to your account',
};

export default function SignInPage() {
	return (
		<Shell layout="auth">
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Inicia sesión</CardTitle>
					<CardDescription>Escoge tu método para iniciar sesión</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<OAuthSignIn />
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="px-2 bg-background text-muted-foreground">O continua con</span>
						</div>
					</div>
					<SignInForm />
				</CardContent>
				<CardFooter className="flex flex-wrap items-center space-x-2">
					<div className="flex-1 text-sm text-muted-foreground">
						¿No tienes una cuenta?{' '}
						<Link aria-label="Registro" href="/registro" className="transition-colors text-primary underline-offset-4 hover:underline">
							Regístrate
						</Link>
					</div>
					<Link aria-label="Reset password" href="/iniciar-sesion/recuperar-contrasena" className="text-sm transition-colors text-primary underline-offset-4 hover:underline">
						Recupera tu contraseña
					</Link>
				</CardFooter>
			</Card>
		</Shell>
	);
}
