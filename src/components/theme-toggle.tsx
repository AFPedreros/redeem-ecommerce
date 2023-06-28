'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			<Icons.sun className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" aria-hidden="true" />
			<Icons.moon className="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" aria-hidden="true" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
