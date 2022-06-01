import styled from 'styled-components';
import ConnectButton from 'components/ConnectButton';

const WalletLoginWrapper = styled.div`
	${({theme}) => theme.positions.flexColumnY}
	margin-top: 30px;

	h1 {
		font-weight: bold;
		font-size: 26px;
	}
`;

function WalletLogin() {
	return (
		<WalletLoginWrapper>
			<h1>Connect Your Wallet.</h1>
			<ConnectButton />
		</WalletLoginWrapper>
	);
}

export default WalletLogin;
