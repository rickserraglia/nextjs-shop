import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';

import { stripe } from '../../lib/stripe';
import { ImageContainer, ProductContainer, ProductDetailsContainer } from '../../styles/pages/product';

interface ProductProps {
	product: {
		id: string;
		name: string;
		imageUrl: string;
		price: string;
		description: string;
		defaultPriceId: string;
	};
}

const Product = ({ product }: ProductProps) => {
	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
		useState(false);
	const { isFallback } = useRouter();

	if (isFallback) {
		return <p>Loading...</p>;
	}

	const handleBuyProduct = async () => {
		try {
			setIsCreatingCheckoutSession(true);

			const response = await axios.post('/api/checkout', {
				priceId: product.defaultPriceId
			});

			const { checkoutUrl } = response.data;

			window.location.href = checkoutUrl;
		} catch (err) {
			setIsCreatingCheckoutSession(false);
			alert('Falha ao redirecionar ao checkout');
		}
	};

	return (
		<>
			<Head>
				<title>{product.name} | Ignite Shop</title>
			</Head>
			<ProductContainer>
				<ImageContainer>
					<Image src={product.imageUrl} alt="" width={520} height={480} />
				</ImageContainer>
				<ProductDetailsContainer>
					<h1>{product.name}</h1>
					<span>{product.price}</span>

					<p>{product.description}</p>

					<button
						disabled={isCreatingCheckoutSession}
						onClick={handleBuyProduct}
					>
						Comprar agora
					</button>
				</ProductDetailsContainer>
			</ProductContainer>
		</>
	);
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
	// Buscar apenas os produtos mais vendidos / mais acessados para colocar nos paths (quando tiver muitos produtos)

	return {
		paths: [{ params: { id: 'prod_MOYCFGVyJcv1Az' } }],
		fallback: true
		// poderia usar também o fallback 'blocking' mas ele demora mais, porque só vai liberar a página quando o carregamento tiver finalizado, enquanto o 'true' já mostra a estrutura da página e só depois preenche os dados. E o fallback 'false' não vai renderizar nenhum produto cujo id não esteja nos 'paths' definidos acima
	};
};

export const getStaticProps: GetStaticProps<Object, { id: string }> = async ({
	params
}) => {
	const productId = params!.id;

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price']
	});

	const price = product.default_price as Stripe.Price;

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}).format(Number(price.unit_amount) / 100),
				description: product.description,
				defaultPriceId: price.id
			}
		},
		revalidate: 60 * 60 * 1 // 1 hour
	};
};
