import { type Metadata } from 'next';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OAuthSignIn } from '@/components/oauth-signin';
import { SignUpForm } from '@/components/forms/signup-form';
import { Shell } from '@/components/shell';

export const metadata: Metadata = {
	title: 'Sign Up',
	description: 'Sign up for an account',
};

export default function SignUpPage() {
	return (
		<Shell layout="auth">
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Registro</CardTitle>
					<CardDescription>Escoge un método para hacer el registro</CardDescription>
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
					<SignUpForm />
				</CardContent>
				<CardFooter className="grid gap-4">
					<div className="text-sm text-muted-foreground">
						¿Ya tienes una cuenta?{' '}
						<Link aria-label="Iniciar sesión" href="/iniciar-sesion" className="transition-colors text-primary underline-offset-4 hover:underline">
							Inicia sesión
						</Link>
					</div>
				</CardFooter>
			</Card>
		</Shell>
	);
}
