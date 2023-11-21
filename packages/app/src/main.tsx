import App from './App';
import { createRoot } from 'react-dom/client';
import {FirebaseWrapper} from './components/FirebaseWrapper';
import {I18nWrapper} from './components/I18nWrapper';
import {ProfileContextProvider} from './contexts/ProfileContext';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
	<FirebaseWrapper>
	    <ProfileContextProvider> {/* profile needs to be loaded first because of dependencies*/}
		<I18nWrapper>
		    <App />
		</I18nWrapper>
	    </ProfileContextProvider>
	</FirebaseWrapper>
    </React.StrictMode>
);
