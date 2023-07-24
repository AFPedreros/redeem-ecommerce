import { LogOutButtons } from '@/components/logout-buttons';
import { Header } from '@/components/layouts/header';
import { Shell } from '@/components/shell';

export default function SignOutPage() {
	return (
		<Shell layout="auth" className="max-w-sm">
			<Header title="Cerrar sesión" description="¿Estas seguro que quieres salir?" size="sm" className="text-center" />
			<LogOutButtons />
		</Shell>
	);
}
