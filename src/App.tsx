import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from 'components/Header';
import NFTs from 'pages/NFTs';
import Account from 'pages/Account';
import WalletLogin from 'pages/WalletLogin';
import PrivateRoute from './routes/PrivateRoute';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				{['/', '/assets'].map((path) => (
					<Route
						path={path}
						element={
							<PrivateRoute>
								<NFTs />
							</PrivateRoute>
						}
					/>
				))}
				<Route
					path='/account'
					element={
						<PrivateRoute>
							<Account />
						</PrivateRoute>
					}
				/>
				<Route path='/login' element={<WalletLogin />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
