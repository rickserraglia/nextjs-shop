import { Handbag } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';

import { CartIconContainer, CartIconCounter } from '../styles/components/cartIcon';

export const CartIcon = () => {
	const { handleCartClick, cartCount } = useShoppingCart();

	return (
		<CartIconContainer onClick={handleCartClick}>
			<Handbag size={24} weight="bold" />
			{cartCount! > 0 && (
				<CartIconCounter>{cartCount! > 9 ? '9+' : cartCount}</CartIconCounter>
			)}
		</CartIconContainer>
	);
};
