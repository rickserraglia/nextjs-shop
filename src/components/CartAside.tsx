import axios from 'axios';
import { NodeNextRequest } from 'next/dist/server/base-http/node';
import Image from 'next/future/image';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import {
	CartActions,
	formatCurrencyString,
	useShoppingCart
} from 'use-shopping-cart';
import { CartEntry as ICartEntry, Product } from 'use-shopping-cart/core';

import {
	CartContainer,
	CartContent,
	CartFooter,
	CartItemsContainer
} from '../styles/components/cartAside';
import CartItem from './CartItem';

export const CartAside = () => {
	const [status, setStatus] = useState('idle');

	const {
		cartCount,
		shouldDisplayCart,
		handleCloseCart,
		removeItem,
		incrementItem,
		decrementItem,
		cartDetails,
		clearCart,
		formattedTotalPrice,
		redirectToCheckout
	} = useShoppingCart();

	const [isCreatingCartCheckoutSession, setIsCreatingCartCheckoutSession] =
		useState(false);

	const handleRedirectToCheckout = async () => {
		try {
			setIsCreatingCartCheckoutSession(true);

			const cartItemsArray = Object.values(cartDetails ?? {}).map(
				(cartItem) => {
					return { price: cartItem.price_id, quantity: cartItem.quantity };
				}
			);

			const response = await axios.post('/api/checkout', {
				products: cartItemsArray
			});

			const { checkoutUrl } = response.data;

			window.location.href = checkoutUrl;
		} catch (err) {
			setIsCreatingCartCheckoutSession(false);
			alert('Falha ao redirecionar ao checkout');
		}
	};

	return (
		<CartContainer className={shouldDisplayCart ? 'active' : ''}>
			<div onClick={handleCloseCart} className="overlay" />
			<CartContent>
				<header>
					<h3>Carrinho</h3>
					{cartCount! >= 1 && (
						<button onClick={clearCart}>Limpar Carrinho</button>
					)}
				</header>
				<X size={25} onClick={handleCloseCart} />
				<CartItemsContainer>
					{cartCount! >= 1 ? (
						Object.values(cartDetails ?? {}).map((cartItem) => (
							<CartItem
								key={cartItem.id}
								entry={cartItem}
								removeItem={() => removeItem(cartItem.id)}
								incrementItem={() => incrementItem(cartItem.id)}
								decrementItem={() => decrementItem(cartItem.id)}
							/>
						))
					) : (
						<p className="empty-cart">O carrinho está vazio</p>
					)}
				</CartItemsContainer>
				{cartCount! >= 1 && (
					<CartFooter>
						<div>
							<p>
								<span>Quantidade</span>
								<span>
									{cartCount} {cartCount == 1 ? 'item' : 'itens'}
								</span>
							</p>
							<p>
								<span>Valor Total</span>
								<span>{formattedTotalPrice}</span>
							</p>
						</div>
						<button
							onClick={handleRedirectToCheckout}
							disabled={isCreatingCartCheckoutSession}
						>
							Finalizar Compra
						</button>
					</CartFooter>
				)}
			</CartContent>
		</CartContainer>
	);
};
