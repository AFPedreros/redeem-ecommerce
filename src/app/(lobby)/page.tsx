'use client';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Home() {
	const { toast } = useToast();
	return (
		<section className="pt-6 pb-8 space-y-6 md:pb-12 md:pt-10 lg:py-32">
			<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
				<h1 className="text-3xl font-heading sm:text-5xl md:text-6xl lg:text-7xl">Redime tus facturas por puntos.</h1>
				<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">Encuentra los mejores productos.</p>
				<div className="space-x-4">
					<Button className={cn(buttonVariants({ size: 'lg' }))}>Sube tus facturas</Button>
					<Link href="/cerrar-sesion" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
						Más información
					</Link>
				</div>
			</div>
		</section>
	);
}
