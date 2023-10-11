import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {AuthContextProvider} from './contexts/useAuth';
import {FirebaseWrapper} from './components/FirebaseWrapper';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
	<FirebaseWrapper>
	    <AuthContextProvider>
		<App />
	    </AuthContextProvider>
	</FirebaseWrapper>
    </React.StrictMode>
);
