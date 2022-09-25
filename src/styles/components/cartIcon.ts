import { styled } from '..';

export const CartIconContainer = styled('div', {
	position: 'relative',
	display: 'flex',
	padding: 12,
	backgroundColor: '$gray800',
	borderRadius: 4,
	cursor: 'pointer',
	transition: '0.2s background-color',

	'&:hover': {
		backgroundColor: '$green700'
	}
});

export const CartIconCounter = styled('span', {
	position: 'absolute',
	fontWeight: 'bold',
	fontSize: '$sm',
	top: -12,
	right: -15,
	height: '32px',
	width: '32px',
	lineHeight: '1.5',
	backgroundColor: '$green300',
	borderRadius: '100%',
	border: '4px solid $gray900',
	textAlign: 'center'
});
