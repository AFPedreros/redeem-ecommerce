import { LogOutButtons } from '@/components/logout-buttons';
import { Header } from '@/components/header';
import { Shell } from '@/components/shell';

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export default function SignOutPage() {
	return (
		<Shell layout="auth" className="max-w-sm">
			<Header title="Cerrar sesión" description="¿Estas seguro que quieres salir?" size="sm" className="text-center" />
			<LogOutButtons />
		</Shell>
	);
}
