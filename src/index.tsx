import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from 'styled-components';
import {theme} from 'styles/theme';
import {GlobalStyle} from 'styles/global';
import {Web3ReactProvider} from '@web3-react/core';
import {Web3Provider} from '@ethersproject/providers';
import App from './App';

const getLibrary = (provider: any) => new Web3Provider(provider);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<App />
			</ThemeProvider>
		</Web3ReactProvider>
	</React.StrictMode>,
);
