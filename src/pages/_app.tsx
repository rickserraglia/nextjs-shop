import type { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';

import { CartProvider, useShoppingCart } from 'use-shopping-cart';

import logoImg from '../assets/logo.svg';
import Image from 'next/future/image';
import { Container, Header } from '../styles/pages/app';
import Link from 'next/link';
import { env } from 'process';
import { CartIcon } from '../components/CartIcon';
import { CartAside } from '../components/CartAside';

globalStyles();

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Container>
			<CartProvider
				mode="payment"
				cartMode="client-only"
				stripe={env.STRIPE_PUBLIC_KEY!}
				successUrl="localhost:3000/success"
				cancelUrl="localhost:3000/"
				currency="BRL"
				allowedCountries={['BR', 'US', 'GB', 'CA']}
				billingAddressCollection={true}
			>
				<Header>
					<Link href="/" prefetch={false}>
						<Image src={logoImg} alt="" />
					</Link>
					<CartIcon />
				</Header>
				<CartAside />
				<Component {...pageProps} />
			</CartProvider>
		</Container>
	);
};

export default App;
