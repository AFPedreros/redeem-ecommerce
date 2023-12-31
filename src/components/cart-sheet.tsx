import Image from 'next/image';

import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// import { UpdateCart } from "@/components/cart/update-cart"
import { Icons } from '@/components/icons';
import { getCartAction } from '@/app/_actions/cart';

export async function CartSheet() {
	const cartLineItems = await getCartAction();

	const itemCount = cartLineItems.reduce((total, item) => total + Number(item.quantity), 0);

	const cartTotal = cartLineItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button aria-label="Cart" variant="ghost" size="icon" className="relative">
					{itemCount > 0 && (
						<Badge variant="secondary" className="absolute w-6 h-6 p-2 rounded-full -right-2 -top-2">
							{itemCount}
						</Badge>
					)}
					<Icons.store className="w-5 h-5" aria-hidden="true" />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col w-full pr-0 sm:max-w-lg">
				<SheetHeader className="px-1">
					<SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
				</SheetHeader>
				<Separator />
				{itemCount > 0 ? (
					<>
						<div className="flex flex-col flex-1 gap-5 overflow-hidden">
							<ScrollArea className="h-full">
								<div className="flex flex-col gap-5 pr-6">
									{cartLineItems.map((item) => (
										<div key={item.id} className="space-y-3">
											<div className="flex items-center space-x-4">
												<div className="relative w-16 h-16 overflow-hidden rounded">
													{item?.images?.length ? (
														<Image
															src={item.images[0]?.url ?? '/images/product-placeholder.webp'}
															alt={item.images[0]?.name ?? item.name}
															sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
															fill
															className="absolute object-cover"
															loading="lazy"
														/>
													) : (
														<div className="flex items-center justify-center h-full bg-secondary">
															<Icons.placeholder className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
														</div>
													)}
												</div>
												<div className="flex flex-col self-start flex-1 gap-1 text-sm">
													<span className="line-clamp-1">{item.name}</span>
													<span className="line-clamp-1 text-muted-foreground">
														{formatPrice(item.price)} x {item.quantity} = {formatPrice((Number(item.price) * Number(item.quantity)).toFixed(2))}
													</span>
													<span className="text-xs capitalize line-clamp-1 text-muted-foreground">
														{`${item.category} ${item.subcategory ? `/ ${item.subcategory}` : ''}`}
													</span>
												</div>
												{/* <UpdateCart cartLineItem={item} /> */}
											</div>
											<Separator />
										</div>
									))}
								</div>
							</ScrollArea>
						</div>
						<div className="grid gap-1.5 pr-6 text-sm">
							<Separator className="mb-2" />
							<div className="flex">
								<span className="flex-1">Subtotal</span>
								<span>{formatPrice(cartTotal.toFixed(2))}</span>
							</div>
							<div className="flex">
								<span className="flex-1">Shipping</span>
								<span>Free</span>
							</div>
							<div className="flex">
								<span className="flex-1">Taxes</span>
								<span>Calculated at checkout</span>
							</div>
							<Separator className="mt-2" />
							<div className="flex">
								<span className="flex-1">Total</span>
								<span>{formatPrice(cartTotal.toFixed(2))}</span>
							</div>
							<SheetFooter className="mt-1.5">
								<Button aria-label="Proceed to checkout" size="sm" className="w-full">
									Proceed to Checkout
								</Button>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center justify-center h-full space-y-2">
						<Icons.cart className="w-12 h-12 text-muted-foreground" aria-hidden="true" />
						<span className="text-lg font-medium text-muted-foreground">Your cart is empty</span>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
