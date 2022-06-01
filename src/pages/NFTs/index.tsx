import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {StylesProvider} from '@material-ui/core';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {CONTACT_ABI, CONTACT_ADDRESS} from 'config/abi.js';
import {ethers} from 'ethers';
import useWallet from 'hooks/useWallet';
import CardItem from 'components/Wallet/CardItem';
import {IItem} from 'components/Wallet/walletType';

function NFTs() {
	const {library, account} = useWallet();
	const [items, setItems] = useState<IItem[]>([]);

	useEffect(() => {
		if (account) {
			const signer = library?.getSigner(account);
			const contractInstance = new ethers.Contract(
				CONTACT_ADDRESS,
				CONTACT_ABI,
				signer,
			);
			contractInstance.getAllTokenData().then((res: IItem[]) => {
				setItems(res);
			});
		}
	}, [account, library]);
	return (
		<StylesProvider injectFirst>
			<Container sx={{py: 8}} maxWidth='lg'>
				<span
					style={{fontSize: '16px', lineHeight: '3'}}
				>{`${items.length} items`}</span>
				<Grid container spacing={4}>
					{items.map((item) => (
						<CardItem item={item} />
					))}
				</Grid>
			</Container>
		</StylesProvider>
	);
}
export default NFTs;
