import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Icons } from '@/components/icons';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
			<AspectRatio ratio={16 / 9}>
				<Image
					src="https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
					alt="A skateboarder doing a high drop"
					priority
					fill
					className="absolute inset-0 object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background/60 to-background/40 md:to-background/30" />
				<Link href="/" className="absolute z-20 flex items-center text-lg font-bold tracking-tight left-8 top-8">
					<Icons.logo className="w-6 h-6 mr-2" aria-hidden="true" />
					<span>{siteConfig.name}</span>
				</Link>
			</AspectRatio>
			<main className="container absolute flex items-center col-span-1 -translate-y-1/2 top-1/2 md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">{children}</main>
		</div>
	);
}
