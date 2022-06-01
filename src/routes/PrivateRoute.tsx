import {Navigate, useNavigate} from 'react-router-dom';
import useWallet from 'hooks/useWallet';

import React from 'react';

interface PrivateRouteProps {
	children: React.ReactElement;
}

function PrivateRoute({children}: PrivateRouteProps) {
	const {active} = useWallet();

	return active ? <>{children} </> : <Navigate to='/login' />;
	// return active ? <Navigate to='/assets' /> : <Navigate to='/login' />;
}

export default PrivateRoute;
