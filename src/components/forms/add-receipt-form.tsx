'use client';

import type { FileWithPreview } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

import { catchError, isArrayOfFile } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, UncontrolledFormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDialog } from '@/components/file-dialog';
import { Icons } from '@/components/icons';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

import { useState, useEffect, useTransition } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { User } from '@clerk/nextjs/dist/types/server';

const validateMall = (obj: { city: string; mall: string }): boolean => {
	switch (obj.city) {
		case 'Cali':
			return ['Chipichape', 'Unicentro Cali'].includes(obj.mall);
		case 'Bogotá':
			return ['Centro Comercial Andino', 'Centro Comercial Gran Estación'].includes(obj.mall);
		case 'Medellín':
			return ['El Tesoro Parque Comercial', 'Centro Comercial Santafé'].includes(obj.mall);
		default:
			return false;
	}
};

type ImageData = {
	path: string;
	preview: string;
};

type DataObject = {
	city: string;
	mall: string;
	value: string;
	receiptId: string;
	images: ImageData[];
};

const receiptSchema = z
	.object({
		city: z.enum(['Bogotá', 'Medellín', 'Cali']),
		mall: z.string().min(1, {
			message: 'Escoge un centro comercial',
		}),
		value: z.string().min(1, {
			message: 'Debe tener al menos 1 caracter',
		}),
		receiptId: z.string().min(5, {
			message: 'Debe tener al menos 5 caracteres',
		}),
		images: z
			.unknown()
			.refine((val) => {
				if (!Array.isArray(val)) return false;
				if (val.some((file) => !(file instanceof File))) return false;
				return true;
			}, 'Must be an array of File')
			.optional()
			.nullable()
			.default(null),
	})
	.refine((obj) => validateMall(obj), { message: 'Mall is not valid for the selected city' });

const cityMalls = {
	Cali: ['Chipichape', 'Unicentro Cali'],
	Bogotá: ['Centro Comercial Andino', 'Centro Comercial Gran Estación'],
	Medellín: ['El Tesoro Parque Comercial', 'Centro Comercial Santafé'],
};

type Inputs = z.infer<typeof receiptSchema>;

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function AddReceiptForm() {
	const { toast } = useToast();
	const [files, setFiles] = useState<FileWithPreview[] | null>(null);
	const [isPending, startTransition] = useTransition();
	const [city, setCity] = useState<'Bogotá' | 'Medellín' | 'Cali' | null>('Cali');
	const [malls, setMalls] = useState<string[]>([]);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (city) {
			setMalls(cityMalls[city] || []);
		} else {
			setMalls([]);
		}
	}, [city]);

	useEffect(() => {
		async function getUser() {
			const nUser = await currentUser();
			setUser(nUser);
			console.log(user);
		}
		getUser();
	}, []);

	// uploadthing
	const { isUploading, startUpload } = useUploadThing('productImage');

	// react-hook-form
	const form = useForm<Inputs>({
		resolver: zodResolver(receiptSchema),
		defaultValues: {
			city: 'Cali',
		},
	});

	function onSubmit(data: Inputs) {
		console.log(data);

		startTransition(async () => {
			try {
				// Upload images if data.images is an array of files
				// const images = isArrayOfFile(data.images)
				// 	? await startUpload(data.images).then((res) => {
				// 			const formattedImages = res?.map((image) => ({
				// 				id: image.fileKey,
				// 				name: image.fileKey.split('_')[1] ?? image.fileKey,
				// 				url: image.fileUrl,
				// 			}));
				// 			return formattedImages ?? null;
				// 	  })
				// 	: null;

				// Agregar la factura
				// await addProductAction({
				// 	...data,
				// 	storeId,
				// 	images,
				// });

				if (!user || !user.emailAddresses[0]) {
					toast({
						description: 'Error al obtener el correo electrónico del usuario',
					});
					return;
				}
				const email = user?.emailAddresses[0].emailAddress;
				const id = data.mall + '-' + data.receiptId;

				const storage = getStorage();
				const storageRef = ref(storage, `facturas/${email}/${id}`);

				// const response = await fetch((data as DataObject).images[0].preview);
				// const imageBlob = await response.blob();

				// const snapshot = await uploadBytes(storageRef, imageBlob);
				// const url = await getDownloadURL(storageRef);

				await setDoc(doc(db, 'users', email, 'facturas', id), {
					id: id,
					// fechaRegistro: snapshot.metadata.timeCreated,
					valorTotal: data.value,
					numeroFactura: data.receiptId,
					ciudad: data.city,
					centroComercial: data.mall,
					estado: 'Por revisión',
					// url: url,
				});

				toast({
					description: '¡Tu factura se subió exitosamente!',
				});

				// Reset form and files
				form.reset();
				setFiles(null);
			} catch (err) {
				catchError(err);
			}
		});
	}

	return (
		<Form {...form}>
			<form className="grid w-full max-w-md gap-5 text-left" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Ciudad</FormLabel>
							<FormControl>
								<Select
									value={field.value}
									onValueChange={(value: typeof field.value) => {
										setCity(value);
										return field.onChange(value);
									}}
								>
									<SelectTrigger className="capitalize">
										<SelectValue placeholder={field.value} />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{['Bogotá', 'Medellín', 'Cali'].map((city) => (
												<SelectItem key={city} value={city} className="capitalize">
													{city}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="mall"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Centro comercial</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={(value: typeof field.value) => field.onChange(value)}>
									<SelectTrigger>
										<SelectValue placeholder="Selecciona el centro comercial" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{malls.map((mall) => (
												<SelectItem key={mall} value={mall} className="capitalize">
													{mall}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormItem>
					<FormLabel>Número de la factura</FormLabel>
					<FormControl>
						<Input aria-invalid={!!form.formState.errors.receiptId} placeholder="Escribe el número de la factura aquí." {...form.register('receiptId')} />
					</FormControl>
					<UncontrolledFormMessage message={form.formState.errors.receiptId?.message} />
				</FormItem>

				<FormItem>
					<FormLabel>Valor total de la factura</FormLabel>
					<FormControl>
						<Input type="number" aria-invalid={!!form.formState.errors.value} placeholder="Escribe el valor aquí." {...form.register('value')} />
					</FormControl>
					<UncontrolledFormMessage message={form.formState.errors.value?.message} />
				</FormItem>

				<FormItem className="flex w-full flex-col gap-1.5">
					<FormControl>
						<FileDialog setValue={form.setValue} name="images" maxFiles={1} maxSize={1024 * 1024 * 4} files={files} setFiles={setFiles} isUploading={isUploading} disabled={isPending} />
					</FormControl>
					<UncontrolledFormMessage message={form.formState.errors.images?.message} />
				</FormItem>

				<Button disabled={isPending}>
					{isPending && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
					Agregar factura
					<span className="sr-only">Agregar factura</span>
				</Button>
			</form>
		</Form>
	);
}
