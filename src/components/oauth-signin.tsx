'use client';

import * as React from 'react';
import { isClerkAPIResponseError, useSignIn } from '@clerk/nextjs';
import { type OAuthStrategy } from '@clerk/types';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

const oauthProviders = [{ name: 'Google', strategy: 'oauth_google', icon: 'google' }] satisfies {
	name: string;
	icon: keyof typeof Icons;
	strategy: OAuthStrategy;
}[];

export function OAuthSignIn() {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null);
	const { signIn, isLoaded: signInLoaded } = useSignIn();

	async function oauthSignIn(provider: OAuthStrategy) {
		if (!signInLoaded) return null;
		try {
			setIsLoading(provider);
			await signIn.authenticateWithRedirect({
				strategy: provider,
				redirectUrl: '/sso-callback',
				redirectUrlComplete: '/',
			});
		} catch (error) {
			setIsLoading(null);

			const unknownError = 'Something went wrong, please try again.';

			isClerkAPIResponseError(error);
			// ? toast.error(error.errors[0]?.longMessage ?? unknownError)
			// : toast.error(unknownError)
			toast({
				title: 'Error',
				description: 'Algo salió mal',
			});
		}
	}

	return (
		<div className="grid grid-cols-1 gap-2">
			{oauthProviders.map((provider) => {
				const Icon = Icons[provider.icon];

				return (
					<Button
						aria-label={`Sign in with ${provider.name}`}
						key={provider.strategy}
						variant="outline"
						className="w-full bg-background sm:w-auto"
						onClick={() => void oauthSignIn(provider.strategy)}
						disabled={isLoading !== null}
					>
						{isLoading === provider.strategy ? <Icons.spinner className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" /> : <Icon className="w-4 h-4 mr-2" aria-hidden="true" />}
						{provider.name}
					</Button>
				);
			})}
		</div>
	);
}
