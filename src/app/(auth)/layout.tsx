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
				<Image src="/images/auth-layout.webp" alt="A skateboarder doing a high drop" priority fill className="absolute inset-0 object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
				<Link href="/" className="absolute z-20 flex items-center text-lg font-bold tracking-tight left-8 top-8">
					<Icons.logo className="w-6 h-6 mr-2" aria-hidden="true" />
					<span>{siteConfig.name}</span>
				</Link>
				<div className="absolute z-20 text-base -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
					Photo by{' '}
					<a href="https://unsplash.com/ja/@pixelperfektion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" className="hover:underline">
						pixelperfektion
					</a>
					{' on '}
					<a href="https://unsplash.com/photos/OS2WODdxy1A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" className="hover:underline">
						Unsplash
					</a>
				</div>
			</AspectRatio>
			<main className="container absolute flex items-center col-span-1 -translate-y-1/2 top-1/2 md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">{children}</main>
		</div>
	);
}
