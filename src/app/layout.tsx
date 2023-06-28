import { cn } from '@/lib/utils';
import '../styles/globals.css';
import { fontMono, fontSans } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme-provider';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';

export const metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es" suppressHydrationWarning>
			<head />
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable, fontMono.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<TailwindIndicator />
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	);
}
