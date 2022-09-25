import { styled } from '..';

export const CartItemContainer = styled('div', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	gap: '1.2rem',
	padding: '0.5rem',

	img: {
		background: 'linear-gradient(-145deg, $green300 0%, $green700 100%)',
		borderRadius: 8
	},

	'> div': {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',

		'> p': {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',

			span: {
				display: 'flex'
			},
			'span:last-child': {
				fontWeight: 'bold'
			}
		},

		footer: {
			paddingTop: '1rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',

			button: {
				fontSize: '16px',
				backgroundColor: 'transparent',
				color: '$green500',
				border: 'none',
				outline: 'none',
				cursor: 'pointer'
			},

			div: {
				display: 'flex',
				flexDirection: 'row',
				gap: '0.5rem',
				backgroundColor: '$gray900',
				padding: '5px 10px',
				borderRadius: '4px'
			}
		}
	}
});
