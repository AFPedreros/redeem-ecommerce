import { type Metadata } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResetPasswordForm } from '@/components/reset-password-form';
import { Shell } from '@/components/shell';

export const metadata: Metadata = {
	title: 'Reset Password',
	description: 'Enter your email to reset your password',
};

export default function ResetPasswordPage() {
	return (
		<Shell layout="auth">
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Cambiar contraseña</CardTitle>
					<CardDescription>Escribe la nueva contraseña</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<ResetPasswordForm />
				</CardContent>
			</Card>
		</Shell>
	);
}
