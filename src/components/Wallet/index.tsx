import {formatEther} from '@ethersproject/units';
import React, {useEffect, useState} from 'react';
import ConnectButton from 'components/ConnectButton';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import SubMenu from 'components/SubMenu';
import useWallet from 'hooks/useWallet';
import useTooltip from '../../hooks/useTooltip';

const WalletINfo = styled.div`
	${({theme}) => theme.positions.spaceAround};
	align-items: center;
	height: 60px;
	border-bottom: 1px solid lightgray;
	margin-bottom: 20px;
	button {
		font-size: 15px;
		color: ${({theme}) => theme.colors.dark_grey};
		border: none;
		background: transparent;
	}
`;
const LeftSide = styled.div`
	display: flex;
	h2 {
		font-size: 20px;
		font-weight: bold;
		line-height: 40px;
	}
`;
const BalanceBox = styled.div`
	${({theme}) => theme.positions.flexCenterXY};
	flex-direction: column;
	border: 1px solid ${({theme}) => theme.colors.dark_grey};
	margin: 0 auto;
	width: 370px;
	height: 100px;
	border-radius: 10px;
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
`;
const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
	<Tooltip {...props} classes={{popper: className}} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		width: 80,
		height: 30,
		fontSize: 15,
		textAlign: 'center',
		backgroundColor: '#c7498c',
	},
});

interface IResult {
	_hex: string;
	_isBigNumber: boolean;
}

const LOGOUT_MENU = [{title: 'Log Out', component: <LogoutIcon />}];

function Wallet() {
	// const [tooltipOpen, setTooltipOpen] = useState(false);
	const [balance, setBalance] = useState('');
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const {account, library, active, copyText} = useWallet();
	const {handleOpen, tooltipOpen} = useTooltip();
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (account) {
			library
				?.getBalance(account)
				// eslint-disable-next-line no-underscore-dangle
				.then((result: IResult) => setBalance(result._hex));
		}
	}, [account, library]);

	// const handleOpen = () => {
	// 	setTooltipOpen(true);
	// 	setTimeout(() => setTooltipOpen(false), 800);
	// };

	const handleCopy = () => {
		copyText();
		handleOpen();
	};
	return (
		<div>
			{active ? (
				<>
					<WalletINfo>
						<LeftSide>
							<h2>My Wallets</h2>
							<Button
								id='fade-button'
								aria-controls={open ? 'fade-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
								<KeyboardArrowDownIcon fontSize='small' />
							</Button>
						</LeftSide>
						<SubMenu
							handleClose={handleClose}
							anchorEl={anchorEl}
							open={open}
							MENU_LIST={LOGOUT_MENU}
						/>
						<CustomTooltip
							title='copied!'
							disableHoverListener
							open={tooltipOpen}
							onOpen={handleOpen}
						>
							<button type='button' onClick={handleCopy}>
								{account?.substr(0, 6)}...
								{account?.substr(-4)}
							</button>
						</CustomTooltip>
					</WalletINfo>
					<BalanceBox>
						<span>Total balance</span>
						<h1>
							{balance && Number(formatEther(balance)).toFixed(4)}
							{balance && `ETH`}
						</h1>
					</BalanceBox>
				</>
			) : (
				<ConnectButton />
			)}
		</div>
	);
}

export default Wallet;
