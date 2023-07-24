'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { wrap } from 'popmotion';
import { Icons } from '@/components/icons';
import Slide from '@/components/slide';

// const images = ['https://i.imgur.com/PWYw2wn.jpg', 'https://i.imgur.com/jxtxPMu.jpg', 'https://i.imgur.com/vZKOfl1.jpg'];

const slides = [
	{
		title: 'Redime tus facturas por puntos.',
		subtitle: 'Ecuentra los mejores productos',
		image: 'https://i.imgur.com/PWYw2wn.jpg',
		cta: 'Registra tu factura',
		cta2: 'Más información',
	},
	{
		title: 'Título 2',
		subtitle: 'Subtítulo 2',
		image: 'https://i.imgur.com/jxtxPMu.jpg',
		cta: 'Call to Action',
	},
	{
		title: 'Título 3',
		subtitle: 'Subtítulo 3',
		image: 'https://i.imgur.com/vZKOfl1.jpg',
		cta: 'Call to Action',
	},
];

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? '100%' : '-100%',
			opacity: 1,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction > 0 ? '-100%' : '100%',
			opacity: 0,
		};
	},
};

export default function HeroSlider() {
	const [[page, direction], setPage] = useState([0, 0]);

	const slideIndex = wrap(0, slides.length, page);
	const nextSlideIndex = wrap(0, slides.length, page + 1);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	return (
		<>
			<AnimatePresence initial={false} custom={direction}>
				<Slide slide={slides[slideIndex]} direction={direction} variants={variants} key={page} />
			</AnimatePresence>
			<AnimatePresence initial={false} custom={direction}>
				{direction !== 0 && <Slide slide={slides[nextSlideIndex]} direction={direction} variants={variants} key={page + 1} />}
			</AnimatePresence>

			<Icons.chevronRight className="absolute z-20 w-10 h-10 text-3xl text-white transform -translate-y-1/2 cursor-pointer top-1/2 right-4" aria-hidden="true" onClick={() => paginate(1)} />

			<Icons.chevronLeft className="absolute z-20 w-10 h-10 text-3xl text-white transform -translate-y-1/2 cursor-pointer top-1/2 left-4" aria-hidden="true" onClick={() => paginate(-1)} />

			<div className="absolute z-20 flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
				{slides.map((_, i) => (
					<div key={i} className={cn(i === slideIndex ? 'bg-white' : 'bg-white/50', 'w-2 h-2 rounded-full cursor-pointer')} onClick={() => setPage([i, i > page ? 1 : -1])} />
				))}
			</div>
		</>
	);
}
