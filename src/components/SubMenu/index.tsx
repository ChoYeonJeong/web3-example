import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useNavigate} from 'react-router-dom';
import useWallet from 'hooks/useWallet';
import {SubMenuProps} from './SubMenutype';

function SubMenu({handleClose, anchorEl, open, MENU_LIST}: SubMenuProps) {
	const wallet = useWallet();
	const navigate = useNavigate();

	const handleLogout = () => {
		handleClose();
		wallet.disconnectWallet().then(() => console.log());
	};

	const handleUrl = (path: string | undefined) => {
		navigate(`${path}`);
	};
	return (
		<Menu
			style={{width: '300px'}}
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
		>
			{MENU_LIST.map((item) =>
				!wallet.active && item.title === 'Log Out' ? (
					''
				) : (
					<div key={item.title}>
						<MenuItem
							onClick={
								!item.path
									? () => handleLogout()
									: () => handleUrl(item.path)
							}
						>
							{item.component}
							{item.title}
						</MenuItem>
					</div>
				),
			)}
		</Menu>
	);
}

export default SubMenu;
