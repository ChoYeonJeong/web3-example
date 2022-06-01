import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';

export const MENU_LIST = [
	{
		title: 'Profile',
		path: '/account',
		component: <PersonIcon />,
	},
	{
		title: 'Favorite',
		path: '/account/favorite',
		component: <FavoriteBorderIcon />,
	},
	{title: 'Log Out', component: <LogoutIcon />},
];
