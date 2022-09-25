import { useKeenSlider } from 'keen-slider/react';
import { GetStaticProps } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import Link from 'next/link';
import { Handbag } from 'phosphor-react';
import { useState } from 'react';
import Stripe from 'stripe';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

import { stripe } from '../lib/stripe';
import { HomeContainer, Product, SliderDots } from '../styles/pages/home';

import 'keen-slider/keen-slider.min.css';

interface HomeProps {
	products: {
		id: string;
		name: string;
		imageUrl: string;
		price: number;
		priceId: string;
	}[];
}

const Home = ({ products }: HomeProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		slides: {
			perView: 3,
			spacing: 48
		},
		loop: true
	});

	const { addItem } = useShoppingCart();

	return (
		<>
			<Head>
				<title>Home | Ignite Shop</title>
			</Head>
			<HomeContainer ref={sliderRef} className="keen-slider">
				{products.map((product) => {
					return (
						<Product className="keen-slider__slide" key={product.id}>
							<Link href={`/products/${product.id}`} prefetch={false}>
								<Image src={product.imageUrl} width={520} height={480} alt="" />
							</Link>
							<footer>
								<Link href={`/products/${product.id}`} prefetch={false}>
									<div>
										<strong>{product.name}</strong>
										<span>
											{formatCurrencyString({
												value: Number(product.price),
												currency: 'BRL'
											})}
										</span>
									</div>
								</Link>
								<button
									onClick={() =>
										addItem({
											name: product.name,
											description: 'random description',
											id: product.id,
											price: product.price,
											price_id: product.priceId,
											currency: 'USD',
											image: product.imageUrl
										})
									}
								>
									<Handbag size={26} weight="bold" />
								</button>
							</footer>
						</Product>
					);
				})}
			</HomeContainer>
			{loaded && instanceRef.current && (
				<SliderDots>
					{Array.from(
						Array(instanceRef.current.track.details.slides.length).keys()
					).map((idx) => {
						return (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={'dot' + (currentSlide === idx ? ' active' : '')}
							></button>
						);
					})}
				</SliderDots>
			)}
		</>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const response = await stripe.products.list({
		expand: ['data.default_price']
	});

	const products = response.data.map((product) => {
		const price = product.default_price as Stripe.Price;

		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: price.unit_amount,
			priceId: product.default_price!.id
		};
	});

	return {
		props: {
			products
		},
		revalidate: 60 * 60 * 2
	};
};
