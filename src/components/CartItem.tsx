import Image from 'next/future/image';
import { CartActions, formatCurrencyString } from 'use-shopping-cart';
import { CartEntry as ICartEntry } from 'use-shopping-cart/core';

import { CartItemContainer } from '../styles/components/cartItem';

const CartItem = ({
	entry,
	removeItem,
	incrementItem,
	decrementItem
}: {
	entry: ICartEntry;
	removeItem: CartActions['removeItem'];
	incrementItem: CartActions['incrementItem'];
	decrementItem: CartActions['decrementItem'];
}) => {
	return (
		<CartItemContainer>
			{entry.image ? (
				<Image
					src={entry.image}
					alt={entry.description}
					width={100}
					height={100}
				/>
			) : null}
			<div>
				<h4>{entry.name}</h4>

				<p>
					<span>
						{entry.quantity} x{' '}
						{formatCurrencyString({ value: entry.price, currency: 'BRL' })}
					</span>
					<span>{entry.formattedValue}</span>
				</p>
				<footer>
					<div>
						{entry.quantity > 1 && (
							<button onClick={() => decrementItem(entry.id)}>-</button>
						)}
						<span>{entry.quantity}</span>
						{entry.quantity >= 1 && (
							<button onClick={() => incrementItem(entry.id)}>+</button>
						)}
					</div>
					<button onClick={() => removeItem(entry.id)}>Remove</button>
				</footer>
			</div>
		</CartItemContainer>
	);
};

export default CartItem;
