// _actions/cart.ts

// Importa el tipo CartItem de donde lo hayas definido
import { CartItem } from '@/types';
import { CartLineItem } from '@/types';

// Define un objeto de entrada para las funciones de acción
interface ActionInput {
	productId: string;
	quantity: number;
}

// Función ficticia para actualizar un artículo en el carrito
export async function updateCartItemAction(input: ActionInput) {
	// Simula un retraso para que parezca que la función está haciendo algo
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Registra la acción en la consola para fines de depuración
	console.log(`Actualizar el artículo del carrito: ${input.productId}, cantidad: ${input.quantity}`);
}

// Función ficticia para eliminar un artículo del carrito
export async function deleteCartItemAction(input: { productId: string }) {
	// Simula un retraso para que parezca que la función está haciendo algo
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Registra la acción en la consola para fines de depuración
	console.log(`Eliminar el artículo del carrito: ${input.productId}`);
}

// Función ficticia para obtener los artículos del carrito
export async function getCartAction(): Promise<CartLineItem[]> {
	// Simula un retraso para que parezca que la función está haciendo algo
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Devuelve un array de objetos CartLineItem
	return [
		{
			id: '1',
			name: 'Producto 1',
			images: [],
			category: 'Categoria 1',
			subcategory: 'Subcategoria 1',
			price: 100,
			inventory: 10,
			storeId: '1',
			storeName: 'Tienda 1',
			quantity: 2,
		},
		{
			id: '2',
			name: 'Producto 2',
			images: [],
			category: 'Categoria 2',
			subcategory: 'Subcategoria 2',
			price: 200,
			inventory: 20,
			storeId: '2',
			storeName: 'Tienda 2',
			quantity: 3,
		},
	];
}
