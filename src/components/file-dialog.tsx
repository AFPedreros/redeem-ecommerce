import * as React from 'react';
import Image from 'next/image';
import type { FileWithPreview } from '@/types';
import { useDropzone, type Accept, type FileRejection, type FileWithPath } from 'react-dropzone';
import type { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

import { cn, formatBytes } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface FileDialogProps<TFieldValues extends FieldValues> extends React.HTMLAttributes<HTMLDivElement> {
	name: Path<TFieldValues>;
	setValue: UseFormSetValue<TFieldValues>;
	accept?: Accept;
	maxSize?: number;
	maxFiles?: number;
	files: FileWithPreview[] | null;
	setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
	isUploading?: boolean;
	disabled?: boolean;
}

export function FileDialog<TFieldValues extends FieldValues>({
	name,
	setValue,
	accept = {
		'image/*': [],
	},
	maxSize = 1024 * 1024 * 2,
	maxFiles = 1,
	files,
	setFiles,
	isUploading = false,
	disabled = false,
	className,
	...props
}: FileDialogProps<TFieldValues>) {
	const { toast } = useToast();
	const onDrop = React.useCallback(
		(acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
			setValue(name, acceptedFiles as PathValue<TFieldValues, Path<TFieldValues>>, {
				shouldValidate: true,
			});

			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);

			if (rejectedFiles.length > 0) {
				rejectedFiles.forEach(({ errors }) => {
					if (errors[0]?.code === 'file-too-large') {
						// toast.error(
						//   `File is too large. Max size is ${formatBytes(maxSize)}`
						// )
						toast({
							title: 'Error',
							description: `El archivo sobrepasa el máximo ${formatBytes(maxSize)}`,
						});
						return;
					}
					//   errors[0]?.message && toast.error(errors[0].message)
					toast({
						title: 'Error',
						description: 'Algo salió mal',
					});
				});
			}
		},

		[maxSize, name, setFiles, setValue]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
		maxSize,
		maxFiles,
		multiple: maxFiles > 1,
		disabled,
	});

	// Revoke preview url when component unmounts
	React.useEffect(() => {
		return () => {
			if (!files) return;
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AlertDialog>
			{files?.length ? (
				<div className="relative flex items-center justify-between gap-2.5">
					<div className="grid gap-5">
						{files?.map((file, i) => (
							<FileCard key={i} i={i} name={name} setValue={setValue} files={files} setFiles={setFiles} file={file} />
						))}
					</div>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="p-0 h-7 w-7"
						onClick={() => {
							setFiles(null);
							setValue(name, null as PathValue<TFieldValues, Path<TFieldValues>>, {
								shouldValidate: true,
							});
						}}
					>
						<Icons.trash className="w-4 h-4 " aria-hidden="true" />
						<span className="sr-only">Eliminar archivo</span>
					</Button>
				</div>
			) : (
				<AlertDialogTrigger asChild>
					<Button variant="outline" disabled={disabled}>
						Subir foto
						<span className="sr-only">Subir foto</span>
					</Button>
				</AlertDialogTrigger>
			)}
			<AlertDialogContent className="sm:max-w-[480px]">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-muted-foreground">Sube la foto de tu factura</AlertDialogTitle>
					<AlertDialogDescription>
						{/* <p className="text-sm font-medium text-center text-muted-foreground">
					You can upload up to {maxFiles} {maxFiles === 1 ? 'file' : 'files'}
				</p> */}
						{files?.length ? (
							<div className="grid gap-5">
								{files?.map((file, i) => (
									<FileCard key={i} i={i} name={name} setValue={setValue} files={files} setFiles={setFiles} file={file} />
								))}
							</div>
						) : null}
						{files?.length ? (
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="mt-2.5 w-full"
								onClick={() => {
									setFiles(null);
									setValue(name, null as PathValue<TFieldValues, Path<TFieldValues>>, {
										shouldValidate: true,
									});
								}}
							>
								<Icons.trash className="w-4 h-4 mr-2" aria-hidden="true" />
								Quitar
								<span className="sr-only">Quitar</span>
							</Button>
						) : (
							<div
								{...getRootProps()}
								className={cn(
									'group relative grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
									'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
									isDragActive && 'border-muted-foreground/50',
									disabled && 'pointer-events-none opacity-60',
									className
								)}
								{...props}
							>
								<input {...getInputProps()} />
								{isUploading ? (
									<div className="grid w-full gap-1 group place-items-center sm:px-10">
										<Icons.upload className="h-9 w-9 animate-pulse text-muted-foreground" aria-hidden="true" />
									</div>
								) : isDragActive ? (
									<div className="grid gap-2 place-items-center text-muted-foreground sm:px-5">
										<Icons.upload className={cn('h-8 w-8', isDragActive && 'animate-bounce')} aria-hidden="true" />
										<p className="text-base font-medium">Drop the file here</p>
									</div>
								) : (
									<div className="grid gap-1 place-items-center sm:px-5">
										<Icons.upload className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
										<p className="mt-2 text-base font-medium text-muted-foreground">Arrastra el archivo aquí, o da click para seleccionar el archvi</p>
										<p className="text-sm text-slate-500">Por favir sube un archivo con un peso menor a {formatBytes(maxSize)}</p>
									</div>
								)}
							</div>
						)}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => {
							setFiles(null);
							setValue(name, null as PathValue<TFieldValues, Path<TFieldValues>>, {
								shouldValidate: true,
							});
						}}
					>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction>Continuar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

interface FileCardProps<TFieldValues extends FieldValues> {
	i: number;
	file: FileWithPreview;
	name: Path<TFieldValues>;
	setValue: UseFormSetValue<TFieldValues>;
	files: FileWithPreview[] | null;
	setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
}

function FileCard<TFieldValues extends FieldValues>({ i, file, name, setValue, files }: FileCardProps<TFieldValues>) {
	return (
		<div className="relative flex items-center justify-between gap-2.5">
			<div className="flex items-center gap-2">
				<Image src={file.preview} alt={file.name} className="w-10 h-10 rounded-md shrink-0" width={40} height={40} loading="lazy" />
				<div className="flex flex-col">
					<p className="text-sm font-medium line-clamp-1 text-muted-foreground">{file.name}</p>
					<p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)}MB</p>
				</div>
			</div>
		</div>
	);
}
