import { currentUser } from '@clerk/nextjs';

import { SiteHeader } from '@/components/site-header';

interface LobbyLayoutProps {
	children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
	const user = await currentUser();

	return (
		<div className="relative flex flex-col min-h-screen">
			<SiteHeader user={user} />
			<main className="flex-1">{children}</main>
		</div>
	);
}
