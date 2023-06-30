import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResetPasswordStep2Form } from '@/components/reset-password-form-step2';
import { Shell } from '@/components/shell';

export default function ResetPasswordStep2Page() {
	return (
		<Shell layout="auth">
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Cambiar contraseña</CardTitle>
					<CardDescription>Ingresa tu correo para recibir un código de verificación</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<ResetPasswordStep2Form />
				</CardContent>
			</Card>
		</Shell>
	);
}
