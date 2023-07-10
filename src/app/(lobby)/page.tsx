'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import HeroSlider from '@/components/hero-slider';

export default function Home() {
	const { toast } = useToast();
	return (
		<>
			<section id="hero" className="overflow-hidden">
				<div className="relative h-[50vh]">
					<HeroSlider />
				</div>
			</section>

			<section id="facturas" className="pt-6 pb-8 space-y-6 bg-muted-foreground/50 md:pb-12 md:pt-10 lg:py-32">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Agrega tus facturas</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Agrega tus facturas y espera su aprobación </p>
				</div>

				<div className="mx-auto text-center md:max-w-[58rem]">
					<p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">Formulario para subir facturas</p>
				</div>
			</section>
		</>
	);
}