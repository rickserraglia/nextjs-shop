import { styled } from '..';

export const HomeContainer = styled('main', {
	display: 'flex',
	width: '100%',
	maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
	marginLeft: 'auto',
	minHeight: 656,
	cursor: 'grab'
});

export const Product = styled('div', {
	background: 'linear-gradient(-145deg, $green300 0%, $green700 100%)',
	borderRadius: 8,
	cursor: 'pointer',
	position: 'relative',

	overflow: 'hidden',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	img: {
		objectFit: 'cover'
	},

	footer: {
		position: 'absolute',
		left: '0.25rem',
		right: '0.25rem',
		bottom: '0.25rem',
		padding: '2rem',
		borderRadius: 6,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',

		backgroundColor: 'rgba(0, 0, 0, 0.6)',

		transform: 'translateY(110%)',
		opacity: 0,
		transition: 'all 0.2s ease-in-out',

		strong: {
			fontSize: '$lg',
			color: '$gray100'
		},

		span: {
			fontSize: '$xl',
			fontWeight: 'bold',
			color: '$green300'
		}
	},

	'&:hover': {
		footer: {
			transform: 'translateY(0%)',
			opacity: 1
		}
	}
});

export const SliderDots = styled('div', {
	paddingBlock: 50,
	width: '100%',
	maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
	marginLeft: 'auto',
	display: 'flex',
	justifyContent: 'center',
	gap: '1rem',

	button: {
		width: '15px',
		height: '15px',
		backgroundColor: '$gray800',
		border: 'none',
		outline: 'none',
		borderRadius: '4px',
		cursor: 'pointer',

		'&.active': {
			backgroundColor: '$green500',
			cursor: 'auto'
		}
	}
});
