export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Redeem E-commerce',
	description: 'E-commerce de redención de facturas para centros comerciales',
	mainNav: [
		{
			title: 'Lobby',
			items: [
				{
					title: 'Productos',
					href: '/productos',
					description: 'Todos los productos que tenemos para ofrecer.',
					items: [],
				},
				{
					title: 'Construye una Tabla',
					href: '/construye-una-tabla',
					description: 'Construye tu propia tabla de skate personalizada.',
					items: [],
				},
				{
					title: 'Blog',
					href: '/blog',
					description: 'Lee nuestras últimas publicaciones de blog.',
					items: [],
				},
			],
		},
		// Aquí puedes agregar más categorías de productos si las tienes
		// Por ejemplo:
		{
			title: 'Categoría de Producto',
			items: [
				{
					title: 'Todos',
					href: '/categorias/categoria-de-producto',
					description: 'Todos los productos en la categoría de producto.',
					items: [],
				},
				// Aquí puedes agregar subcategorías si las tienes
				// Por ejemplo:
				{
					title: 'Subcategoría de Producto',
					href: '/categorias/categoria-de-producto/subcategoria-de-producto',
					description: 'Descripción de la subcategoría de producto.',
					items: [],
				},
			],
		},
	],
};
