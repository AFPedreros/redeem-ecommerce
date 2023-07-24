import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useToast } from '@/hooks/use-toast';
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(Number(price));
}

export function formatBytes(bytes: number, decimals = 0, sizeType: 'accurate' | 'normal' = 'normal') {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
	if (bytes === 0) return '0 Byte';
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'}`;
}

export function isArrayOfFile(files: unknown): files is File[] {
	const isArray = Array.isArray(files);
	if (!isArray) return false;
	return files.every((file) => file instanceof File);
}

export function catchError(err: unknown) {
	const { toast } = useToast();
	if (err instanceof z.ZodError) {
		const errors = err.issues.map((issue) => {
			return issue.message;
		});
		// return toast(errors.join('\n'));
		return toast({
			title: 'Error',
			description: 'Algo salió mal',
		});
	} else if (err instanceof Error) {
		// return toast(err.message);
		return toast({
			title: 'Error',
			description: 'Algo salió mal',
		});
	} else {
		// return toast('Something went wrong, please try again later.');
		return toast({
			title: 'Error',
			description: 'Algo salió mal',
		});
	}
}
