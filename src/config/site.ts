export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Redeem E-commerce',
	description: 'E-commerce de redención de facturas para centros comerciales',
	mainNav: [
		// {
		// 	title: 'Productos',
		// 	items: [
		// 		{
		// 			title: 'Todos',
		// 			href: '/categorias/categoria-de-producto',
		// 			description: 'Todos los productos en la categoría de producto.',
		// 			items: [],
		// 		},
		// 	],
		// },
		{
			title: 'Productos',
			href: '/productoz',
			description: 'Todos los productos en la categoría de producto.',
		},
		{
			title: 'Cómo Funciona',
			href: '/como-funciona',
			description: 'Aprende cómo puedes subir tus facturas y ganar puntos.',
		},
		{
			title: 'Preguntas Frecuentes',
			href: '/preguntas-frecuentes',
			description: 'Respuestas a preguntas generales sobre la plataforma.',
		},
	],
};
