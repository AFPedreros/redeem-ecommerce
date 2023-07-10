import Link from 'next/link';
import type { User } from '@clerk/nextjs/dist/types/server';

import { dashboardConfig } from '@/config/dashboard';
import { siteConfig } from '@/config/site';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartSheet } from '@/components/cart-sheet';
import { Combobox } from '@/components/combobox';
import { Icons } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface SiteHeaderProps {
	user: User | null;
}

export function SiteHeader({ user }: SiteHeaderProps) {
	const initials = `${user?.firstName?.charAt(0) ?? ''} ${user?.lastName?.charAt(0) ?? ''}`;
	const email = user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ?? '';

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex items-center h-16">
				<MainNav items={siteConfig.mainNav} />
				<MobileNav mainNavItems={siteConfig.mainNav} sidebarNavItems={dashboardConfig.sidebarNav} />
				<div className="flex items-center justify-end flex-1 space-x-4">
					<nav className="flex items-center space-x-2">
						{/* <Combobox /> // El futuro buscador de productos */}

						<div className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'flex items-center')}>
							<Icons.circleDollarSign className="w-4 h-4 mr-1" aria-hidden="true" />
							<p className="text-sm">86</p>
						</div>
						{user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="secondary" className="relative w-8 h-8 rounded-full">
										<Avatar className="w-8 h-8">
											<AvatarImage src={user.imageUrl} alt={user.username ?? ''} />
											<AvatarFallback>{initials}</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												{user.firstName} {user.lastName}
											</p>
											<p className="text-xs leading-none text-muted-foreground">{email}</p>
										</div>
									</DropdownMenuLabel>

									<DropdownMenuSeparator />

									<DropdownMenuGroup>
										<DropdownMenuItem asChild>
											<Link href="/">
												<Icons.user className="w-4 h-4 mr-2" aria-hidden="true" />
												Mi perfil
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href="/">
												<Icons.fileText className="w-4 h-4 mr-2" aria-hidden="true" />
												Mis facturas
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href="/">
												<Icons.filePlus className="w-4 h-4 mr-2" aria-hidden="true" />
												Sube tu factura
											</Link>
										</DropdownMenuItem>
									</DropdownMenuGroup>

									<DropdownMenuSeparator />

									<DropdownMenuItem asChild>
										<Link href="/cerrar-sesion">
											<Icons.logout className="w-4 h-4 mr-2" aria-hidden="true" />
											Cerrar sesión
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link href="/iniciar-sesion">
								<div
									className={buttonVariants({
										size: 'sm',
									})}
								>
									Iniciar sesión
									<span className="sr-only">Iniciar sesión</span>
								</div>
							</Link>
						)}
						<CartSheet />
					</nav>
				</div>
			</div>
		</header>
	);
}
