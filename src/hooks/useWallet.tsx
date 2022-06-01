import {useWeb3React} from '@web3-react/core';
import {injected} from '../lib/Connectors';

function UseWallet() {
	const {account, activate, deactivate, active, library} = useWeb3React();

	const connectWallet = async () => {
		try {
			await activate(injected, (error) => {
				console.log(error, 'err');
				// 크롬 익스텐션 없을 경우 오류 핸들링
				if ('/No Ethereum provider was found on window.ethereum/')
					throw new Error('Metamask 익스텐션을 설치해주세요');
			});
		} catch (err) {
			alert(err);
			window.open('https://metamask.io/download.html');
		}
	};

	const disconnectWallet = async () => {
		try {
			await deactivate();
		} catch (err) {
			console.log(err);
		}
	};
	const copyText = () => {
		if (account) {
			navigator.clipboard.writeText(account);
		}
	};
	return {
		connectWallet,
		disconnectWallet,
		copyText,
		active,
		account,
		library,
	};
}

export default UseWallet;
