import { styled } from '..';

export const CartContainer = styled('div', {
	position: 'fixed',
	zIndex: 100,
	display: 'flex',
	inset: 0,
	transition: 'transform 0.3s',

	'&:not(.active)': {
		transition: 'transform 0.3s 0.4s',
		transform: 'translateX(100vw)'
	},

	'.overlay': {
		flex: 1,
		cursor: 'pointer',
		backgroundColor: 'rgba(18, 18, 20, 0.8)',
		transition: 'background-color 0.4s 0.3s'
	},

	'&:not(.active) .overlay': {
		backgroundColor: 'transparent',
		transition: 'background-color 0.4s'
	}
});

export const CartContent = styled('div', {
	position: 'relative',
	padding: 48,
	width: '480px',
	height: '100%',
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	marginLeft: 'auto',
	background: '$gray800',
	boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

	header: {
		marginTop: 36,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		h3: {
			fontSize: '$lg'
		},

		button: {
			backgroundColor: '$green500',
			fontWeight: 'bold',
			color: '$white',
			padding: '5px 10px',
			border: 'none',
			outline: 'none',
			cursor: 'pointer',
			borderRadius: 4,
			transition: 'background-color 0.25s',

			'&:hover': {
				backgroundColor: '$green700'
			}
		}
	},

	svg: {
		cursor: 'pointer',
		position: 'absolute',
		right: 24,
		top: 24
	}
});

export const CartItemsContainer = styled('div', {
	flex: 1,
	paddingTop: 24,
	position: 'relative',

	'.empty-cart': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translateX(-50%) translateY(-50%)'
	}
});

export const CartFooter = styled('footer', {
	display: 'flex',
	flexDirection: 'column',
	gap: 6,

	div: {
		paddingBlock: '2rem',
		fontSize: '$md',
		display: 'flex',
		flexDirection: 'column',
		gap: '0.6rem',

		p: {
			display: 'flex',
			justifyContent: 'space-between'
		}
	},

	button: {
		padding: '0.6rem',
		fontSize: '$md',
		fontWeight: 'bold',
		color: '$white',
		backgroundColor: '$green500',
		borderRadius: 4,
		border: 'none',
		outline: 'none',
		transition: 'background-color 0.25s',
		cursor: 'pointer',

		'&:hover': {
			backgroundColor: '$green700'
		}
	}
});
