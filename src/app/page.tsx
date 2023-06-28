'use client';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
			<ThemeToggle />
		</div>
	);
}
