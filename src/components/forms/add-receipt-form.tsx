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

const receiptSchema = z
	.object({
		city: z.enum(['Bogotá', 'Medellín', 'Cali']),
		mall: z.string(),
		value: z.string(),
		receiptId: z.string().min(1),
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

	useEffect(() => {
		if (city) {
			setMalls(cityMalls[city] || []);
		} else {
			setMalls([]);
		}
	}, [city]);

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
						<FileDialog setValue={form.setValue} name="images" maxFiles={3} maxSize={1024 * 1024 * 4} files={files} setFiles={setFiles} isUploading={isUploading} disabled={isPending} />
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
{
	/* <Form {...form}>
			<form className="grid w-full max-w-2xl gap-5" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
				<FormItem>
					<FormLabel>Name</FormLabel>
					<FormControl>
						<Input aria-invalid={!!form.formState.errors.name} placeholder="Type product name here." {...form.register('name')} />
					</FormControl>
					<UncontrolledFormMessage message={form.formState.errors.name?.message} />
				</FormItem>
				<div className="flex flex-col items-start gap-6 sm:flex-row">
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={(value: typeof field.value) => field.onChange(value)}>
										<SelectTrigger className="capitalize">
											<SelectValue placeholder={field.value} />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{Object.values(products.category.enumValues).map((option) => (
													<SelectItem key={option} value={option} className="capitalize">
														{option}
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
						name="subcategory"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Subcategory</FormLabel>
								<FormControl>
									<Select value={field.value?.toString()} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Select a subcategory" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{subcategories.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
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
				</div>
				<div className="flex flex-col items-start gap-6 sm:flex-row">
					<FormItem className="w-full">
						<FormLabel>Price</FormLabel>
						<FormControl>
							<Input placeholder="Type product price here." {...form.register('price')} />
						</FormControl>
						<UncontrolledFormMessage message={form.formState.errors.price?.message} />
					</FormItem>
					<FormItem className="w-full">
						<FormLabel>Inventory</FormLabel>
						<FormControl>
							<Input
								type="number"
								inputMode="numeric"
								placeholder="Type product inventory here."
								{...form.register('inventory', {
									valueAsNumber: true,
								})}
							/>
						</FormControl>
						<UncontrolledFormMessage message={form.formState.errors.inventory?.message} />
					</FormItem>
				</div>
				<FormItem className="flex w-full flex-col gap-1.5">
					<FormLabel>Images</FormLabel>
					<FormControl>
						<FileDialog setValue={form.setValue} name="images" maxFiles={3} maxSize={1024 * 1024 * 4} files={files} setFiles={setFiles} isUploading={isUploading} disabled={isPending} />
					</FormControl>
					<UncontrolledFormMessage message={form.formState.errors.images?.message} />
				</FormItem>
				<Button className="w-fit" disabled={isPending}>
					{isPending && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
					Add Product
					<span className="sr-only">Add Product</span>
				</Button>
			</form>
		</Form> */
}
