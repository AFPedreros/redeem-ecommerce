'use client';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
	const { toast } = useToast();
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Button
				onClick={() => {
					toast({
						title: 'Scheduled: Catch up',
						description: 'Friday, February 10, 2023 at 5:57 PM',
					});
				}}
			>
				Mostrar toast
			</Button>
			<Link className={buttonVariants({ variant: 'outline' })} href="/cerrar-sesion">
				<Icons.logout className="w-4 h-4 mr-2" aria-hidden="true" />
				Log out
			</Link>
			<ThemeToggle />
		</div>
	);
}
