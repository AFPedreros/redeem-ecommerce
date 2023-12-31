import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';

export function SiteFooter() {
	return (
		<footer className="w-full border-t bg-background">
			<div className="container flex flex-col items-center justify-between py-5 space-y-1 md:h-16 md:flex-row md:py-0">
				<Image className="hidden dark:block" src="/Firma-Partner-Blanco.gif" width={200} height={200} alt="Gif de la firma de Partner con texto blanco" />
				<Image className="dark:hidden" src="/Firma-Partner-Negro.gif" width={200} height={200} alt="Gif de la firma de Partner con texto negro" />
				<div className="flex items-center space-x-1">
					<ThemeToggle />
				</div>
			</div>
		</footer>
	);
}
