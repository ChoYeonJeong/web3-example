import * as React from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import {Link} from 'react-router-dom';
import Wallet from 'components/Wallet';
import {logo} from 'assets';
import {useState} from 'react';
import SubMenu from 'components/SubMenu';
import {useWeb3React} from '@web3-react/core';
import {MENU_LIST} from './menuData';

const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const StyledButton = styled(IconButton)`
	margin-left: 15px;
	h2 {
		font-weight: bold;
	}
	:hover {
		background-color: transparent;
		svg {
			color: black;
		}
		h2 {
			color: black;
		}
	}
`;

function Header() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);
	const [isWalletVisible, setIsWalletVisible] = useState(false);
	const {active} = useWeb3React();

	const toggleWallet = () => {
		setIsWalletVisible((prev) => !prev);
	};
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar style={{backgroundColor: 'white'}} position='static'>
				<Toolbar>
					<img src={logo} alt='logo' width={200} />
					<Search style={{border: '#404f56 1px solid'}}>
						<SearchIconWrapper>
							<SearchIcon style={{color: '#404f56'}} />
						</SearchIconWrapper>
						<StyledInputBase
							style={{color: '#404f56'}}
							placeholder='Search…'
							inputProps={{'aria-label': 'search'}}
						/>
					</Search>
					<Box sx={{flexGrow: 1}} />
					<Box sx={{display: {xs: 'none', md: 'flex'}}}>
						<StyledButton size='small'>
							{active ? (
								<Link to='/assets'>
									<h2>NFTs</h2>
								</Link>
							) : (
								<Link to='/login?assets'>
									<h2>NFTs</h2>
								</Link>
							)}
						</StyledButton>
						<StyledButton
							size='small'
							edge='end'
							aria-label='account of current user'
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
						>
							{active ? (
								<Link to='/account'>
									<AccountCircleOutlinedIcon />
								</Link>
							) : (
								<Link to='/login?account'>
									<AccountCircleOutlinedIcon />
								</Link>
							)}
						</StyledButton>
						<StyledButton onClick={toggleWallet}>
							<AccountBalanceWalletOutlinedIcon />
						</StyledButton>
					</Box>
				</Toolbar>
			</AppBar>
			{isWalletVisible && (
				<Drawer
					size={400}
					duration={500}
					open={isWalletVisible}
					onClose={toggleWallet}
					direction='right'
				>
					<Wallet />
				</Drawer>
			)}
			<SubMenu
				handleClose={handleMenuClose}
				anchorEl={anchorEl}
				open={isMenuOpen}
				MENU_LIST={MENU_LIST}
			/>
		</Box>
	);
}
export default Header;
