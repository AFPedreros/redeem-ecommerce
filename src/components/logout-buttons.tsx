'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks/use-mounted';
import { Button, buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Icons } from '@/components/icons';

export function LogOutButtons() {
	const router = useRouter();
	const mounted = useMounted();
	const [isPending, startTransition] = React.useTransition();

	return (
		<div className="flex items-center w-full space-x-2">
			{mounted ? (
				<SignOutButton
					signOutCallback={() =>
						startTransition(() => {
							router.push(`${window.location.origin}/?redirect=false`);
						})
					}
				>
					<Button aria-label="Cerrar sesión" size="sm" className="flex items-center justify-center w-full px-4" disabled={isPending}>
						{isPending && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
						Cerrar sesión
					</Button>
				</SignOutButton>
			) : (
				<Skeleton className={cn(buttonVariants({ size: 'sm' }), 'w-full bg-muted text-muted-foreground')}>Cerrar sesión</Skeleton>
			)}
			<Button aria-label="Regresar a la página anterior" variant="outline" size="sm" className="w-full" onClick={() => router.back()} disabled={isPending}>
				Regresar
			</Button>
		</div>
	);
}
