import { styled } from '..';

export const ProductContainer = styled('main', {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	alignItems: 'stretch',
	gridGap: '4rem',

	maxWidth: 1180,
	margin: '0 auto'
});

export const ImageContainer = styled('div', {
	width: '100%',
	maxWidth: 576,
	height: 656,
	background: 'linear-gradient(-145deg, $green300 0%, $green700 100%)',
	borderRadius: 8,
	padding: '0.25rem',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	img: {
		objectFit: 'cover'
	}
});

export const ProductDetailsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',

	h1: {
		fontSize: '$2xl',
		color: '$gray300'
	},

	span: {
		marginTop: '1rem',
		display: 'block',
		fontSize: '$2xl',
		color: '$green300'
	},

	p: {
		marginTop: '2.5rem',
		fontSize: '$md',
		lineHeight: 1.6,
		color: '$gray300'
	},

	footer: {
		marginTop: 'auto',
		display: 'flex',
		flexDirection: 'column',
		gap: 8,

		button: {
			marginTop: 'auto',
			backgroundColor: '$green500',
			border: 0,
			color: '$white',
			borderRadius: 8,
			padding: '1.25rem',
			cursor: 'pointer',
			fontWeight: 'bold',
			fontSize: '$md',
			transition: 'background-color 0.2s',

			'&:hover': {
				backgroundColor: '$green300'
			}
		}
	}
});
