import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {formatEther} from '@ethersproject/units';
import {useState} from 'react';
import {CardItemProps} from './walletType';

const StyledCardContent = styled(CardContent)`
	${({theme}) => theme.positions.spaceBetween};
`;
const StyledTypography = styled(Typography)`
	display: flex;
	flex-direction: column;
`;
const StyledCard = styled(Card)`
	transition: 0.3s;
	cursor: pointer;
	:hover {
		box-shadow: 0 0 3px black;
		margin-top: -5px;
	}
`;
const EmptyHeart = styled(FavoriteBorderIcon)`
	color: ${({theme}) => theme.colors.pink};
`;
const Heart = styled(FavoriteIcon)`
	color: ${({theme}) => theme.colors.pink};
`;

function CardItem({item}: CardItemProps) {
	const [liked, setLiked] = useState(false);

	const handleLike = () => {
		setLiked((prev) => !prev);
	};
	return (
		<Grid item xs={12} sm={6} md={3}>
			<StyledCard
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<CardMedia
					style={{height: '153px'}}
					component='img'
					image={item.uriPath}
					alt='random'
				/>
				<StyledCardContent sx={{flexGrow: 1}}>
					<Typography
						style={{lineHeight: '40px'}}
						gutterBottom
						variant='body2'
						component='h2'
					>
						{item.title}
					</Typography>
					<StyledTypography gutterBottom variant='body2'>
						<span style={{color: 'grey', fontSize: '12px'}}>
							price
						</span>
						{/* eslint-disable-next-line no-underscore-dangle */}
						{Number(formatEther(item.tokenPrice._hex)) *
							1000000000000000000}
						wei
					</StyledTypography>
				</StyledCardContent>
				<StyledCardContent>
					<Button style={{color: '#c7498c'}} size='small'>
						Buy now
					</Button>
					{liked ? (
						<Heart onClick={handleLike} />
					) : (
						<EmptyHeart onClick={handleLike} />
					)}
				</StyledCardContent>
			</StyledCard>
		</Grid>
	);
}
export default CardItem;
