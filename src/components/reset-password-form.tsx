'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { isClerkAPIResponseError, useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import type { z } from 'zod';

import { checkEmailSchema } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';

type Inputs = z.infer<typeof checkEmailSchema>;

export function ResetPasswordForm() {
	const { toast } = useToast();
	const router = useRouter();
	const { isLoaded, signIn } = useSignIn();
	const [isPending, startTransition] = React.useTransition();

	// react-hook-form
	const form = useForm<Inputs>({
		resolver: zodResolver(checkEmailSchema),
		defaultValues: {
			email: '',
		},
	});

	function onSubmit(data: Inputs) {
		if (!isLoaded) return;

		startTransition(async () => {
			try {
				const firstFactor = await signIn.create({
					strategy: 'reset_password_email_code',
					identifier: data.email,
				});

				if (firstFactor.status === 'needs_first_factor') {
					router.push('/iniciar-sesion/recuperar-contrasena/paso2');
					toast({
						title: 'Verifica tu correo',
						description: 'Te enviamos un código de verificación.',
					});
				}
			} catch (error) {
				const unknownError = 'Something went wrong, please try again.';

				isClerkAPIResponseError(error);
				//   ? toast.error(error.errors[0]?.longMessage ?? unknownError)
				//   : toast.error(unknownError)
				toast({
					title: 'Error',
					description: 'Algo salió mal',
				});
			}
		});
	}

	return (
		<Form {...form}>
			<form className="grid gap-4" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="rodneymullen180@gmail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending}>
					{isPending && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
					Continue
					<span className="sr-only">Continue to reset password verification</span>
				</Button>
			</form>
		</Form>
	);
}
