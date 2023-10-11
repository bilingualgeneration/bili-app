import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {AuthContextProvider} from './contexts/useAuth';
import {FirebaseAppProvider} from 'reactfire';

const container = document.getElementById('root');
const root = createRoot(container!);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID
}

root.render(
    <React.StrictMode>
	<FirebaseAppProvider firebaseConfig={firebaseConfig}>
	    <AuthContextProvider>
		<App />
	    </AuthContextProvider>
	</FirebaseAppProvider>
    </React.StrictMode>
);
