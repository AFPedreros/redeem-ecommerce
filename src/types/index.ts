// import { type Product } from "@/db/schema"
// import { type FileWithPath } from "react-dropzone"
import firebase from 'firebase/compat/app';

import { type Icons } from '@/components/icons';

export interface NavItem {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	label?: string;
	description?: string;
}

export interface NavItemWithChildren extends NavItem {
	items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
	items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type UserRole = 'user' | 'admin' | 'superadmin';

export type Option = {
	label: string;
	value: string;
};

// export type FileWithPreview = FileWithPath & {
//   preview: string
// }

export type StoredFile = {
	id: string;
	name: string;
	url: string;
};

export type CartItem = {
	productId: number;
	quantity: number;
	productSubcategory?: string | null;
};

export interface CheckoutItem extends CartItem {
	price: number;
}

export type SubscriptionPlan = {
	name: string;
	description: string;
	stripePriceId: string;
	monthlyPrice?: number | null;
};

export interface Product {
	id: string;
	name: string;
	description: string;
	images: StoredFile[] | null;
	category: string;
	subcategory: string | null;
	price: number;
	inventory: number;
	rating: number;
	tags: string[] | null;
	storeId: string;
	createdAt: firebase.firestore.Timestamp;
}

export interface CartLineItem {
	id: string;
	name: string;
	images: StoredFile[] | null;
	category: string;
	subcategory: string | null;
	price: number;
	inventory: number;
	storeId: string;
	quantity?: number;
	storeName: string | null;
}
