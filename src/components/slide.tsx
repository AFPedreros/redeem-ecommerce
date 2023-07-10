'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

type SlideProps = {
	slide: {
		title: string;
		subtitle: string;
		image: string;
		cta: string;
		cta2?: string;
	};
	direction: number;
	variants: {
		enter: (direction: number) => { x: number; opacity: number };
		center: { zIndex: number; x: number; opacity: number };
		exit: (direction: number) => { zIndex: number; x: number; opacity: number };
	};
};

export default function slide({ slide, direction, variants }: SlideProps) {
	return (
		<motion.div
			className="absolute flex items-center justify-center w-full h-full bg-center bg-cover"
			style={{ backgroundImage: `url(${slide.image})` }}
			key={slide.title}
			custom={direction}
			variants={variants}
			initial="enter"
			animate="center"
			exit="exit"
			transition={{
				x: { type: 'spring', stiffness: 300, damping: 30, duration: 1.0 },
				opacity: { duration: 0.5 },
			}}
		>
			<div className="mx-auto flex max-w-[48rem] flex-col items-center space-y-4 text-center bg-background/25 backdrop-blur w-fit p-10 rounded-md">
				<h1 className="text-3xl font-heading sm:text-5xl md:text-6xl lg:text-7xl">{slide.title}</h1>
				<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">{slide.subtitle}</p>
				<div className="space-x-4">
					<Button>{slide.cta}</Button>
					{slide.cta2 && (
						<Link href="/" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}>
							{slide.cta2}
						</Link>
					)}
				</div>
			</div>
		</motion.div>
	);
}
