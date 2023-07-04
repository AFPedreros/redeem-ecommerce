import { cn } from '@/lib/utils';
import '../styles/globals.css';
import { fontMono, fontSans } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import { currentUser } from '@clerk/nextjs';
import { SiteHeader } from '@/components/site-header';
import { useRouter } from 'next/router';

export const metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const user = await currentUser();
	return (
		<>
			<ClerkProvider>
				<html lang="es" suppressHydrationWarning>
					<head />
					<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable, fontMono.variable)}>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<main className="flex-1">{children}</main>
							<TailwindIndicator />
						</ThemeProvider>
						<Toaster />
					</body>
				</html>
			</ClerkProvider>
		</>
	);
}
