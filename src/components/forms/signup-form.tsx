'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { isClerkAPIResponseError, useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import type { z } from 'zod';

import { authSchema } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { PasswordInput } from '@/components/password-input';

type Inputs = z.infer<typeof authSchema>;

export function SignUpForm() {
	const { toast } = useToast();
	const router = useRouter();
	const { isLoaded, signUp } = useSignUp();
	const [isPending, startTransition] = React.useTransition();

	// react-hook-form
	const form = useForm<Inputs>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(data: Inputs) {
		if (!isLoaded) return;

		startTransition(async () => {
			try {
				await signUp.create({
					emailAddress: data.email,
					password: data.password,
				});

				// Send email verification code
				await signUp.prepareEmailAddressVerification({
					strategy: 'email_code',
				});

				router.push('/registro/verificar-email');
				toast({
					title: 'Revisa tu correo',
					description: 'Te enviamos un código de verificación por correo electrónico.',
				});
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
							<FormLabel>Correo</FormLabel>
							<FormControl>
								<Input placeholder="correo@gmail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contraseña</FormLabel>
							<FormControl>
								<PasswordInput placeholder="**********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending}>
					{isPending && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
					Continuar
					<span className="sr-only">Continúa para la página de verificación de correo</span>
				</Button>
			</form>
		</Form>
	);
}
