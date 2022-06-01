import styled from 'styled-components';
import {useLocation, useNavigate} from 'react-router-dom';
import useWallet from 'hooks/useWallet';
import {useEffect} from 'react';

const metamaskIcon = 'https://docs.metamask.io/metamask-fox.svg';
const ConnectorWrapper = styled.div`
	h2 {
		height: 59px;
		line-height: 59px;
		border-bottom: 1px solid lightgray;
		font-size: 20px;
		font-weight: bold;
		padding-left: 65px;
	}
`;
const ButtonWrapper = styled.div`
	width: 70%;
	margin: 0 auto;
	p {
		margin: 20px 0;
		color: ${({theme}) => theme.colors.dark_grey};
		font-weight: 600;
	}
	button {
		width: 100%;
		border: 1px solid lightgray;
		background-color: transparent;
		:hover {
			background-color: ${({theme}) => theme.colors.pink};
		}
		h1 {
			font-weight: bold;
			font-size: 14px;
		}
	}
`;

function ConnectButton() {
	const location = useLocation();
	const {connectWallet, active} = useWallet();
	const navigate = useNavigate();

	useEffect(() => {
		if (active) {
			const path = location.search.slice(1);
			navigate(`/${path}`);
		}
	}, [active, location, navigate]);

	return (
		<ConnectorWrapper>
			{location.pathname !== '/login' && <h2>My Wallet</h2>}
			<ButtonWrapper>
				<p>
					Connect with one of our available wallet providers or create
					a new one.
				</p>
				<article>
					<button onClick={connectWallet} type='button'>
						<img width={30} src={metamaskIcon} alt='icon' />
						<h1>MetaMask</h1>
					</button>
				</article>
			</ButtonWrapper>
		</ConnectorWrapper>
	);
}

export default ConnectButton;
